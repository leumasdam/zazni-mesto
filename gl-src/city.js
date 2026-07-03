/* ZAŽNI MESTO — WebGL mesto (three.js + bloom)
   Bundluje sa do vendor/zazni-gl.js (IIFE, beží aj z file://).
   API: ZazniGL.init(canvas, data) -> {frame(st), project(x,y), resize(w,h,dpr)} | null
   data: {polys:[{pts,t,phase,big,own,ha,cx,cy}], boundary, dots, W, H, ramp} */
import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/examples/jsm/postprocessing/OutputPass.js';

const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;

function init(canvas,data){
  let renderer;
  try{
    renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
    renderer.debug.checkShaderErrors=false;
  }catch(e){return null;}
  if(!renderer.getContext())return null;

  const {polys,boundary,dots,W,H,ramp,danube=[]}=data;
  const S=4000;                              /* svetové stupne -> GL jednotky */
  const cxW=W/2,cyH=H/2;
  const X=x=>(x-cxW)*S, Z=y=>(y-cyH)*S;

  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x05070F);
  const D0=H*S*.94;
  scene.fog=new THREE.Fog(0x05070F,D0*1.5,D0*3.4);

  const cam=new THREE.PerspectiveCamera(38,1,S*.01,D0*6);

  /* podlaha + hranica mesta */
  {
    const g=new THREE.PlaneGeometry(W*S*4,H*S*4);
    const m=new THREE.MeshBasicMaterial({color:0x05070F});
    const pl=new THREE.Mesh(g,m);pl.rotation.x=-Math.PI/2;pl.position.y=-2;scene.add(pl);
  }
  {
    const shape=new THREE.Shape(boundary.map(([x,y])=>new THREE.Vector2(X(x),-Z(y))));
    const g=new THREE.ShapeGeometry(shape);g.rotateX(-Math.PI/2);
    const m=new THREE.MeshBasicMaterial({color:0x0C101F});
    const mesh=new THREE.Mesh(g,m);mesh.position.y=-1;scene.add(mesh);
    const lg=new THREE.BufferGeometry().setFromPoints(boundary.map(([x,y])=>new THREE.Vector3(X(x),.5,Z(y))));
    const line=new THREE.LineLoop(lg,new THREE.LineBasicMaterial({color:0x3D4568,transparent:true,opacity:.0}));
    scene.add(line);init.boundLine=line;
  }

  /* Dunaj — tmavomodrá stuha, mesto sa okamžite číta ako Bratislava */
  {
    const wHalf=W*S*.006;
    for(const seg of danube){
      if(seg.length<2)continue;
      const pos=[];
      for(let i=0;i<seg.length;i++){
        const [x,y]=seg[i];
        const [x2,y2]=seg[Math.min(i+1,seg.length-1)];
        const [x0,y0]=seg[Math.max(i-1,0)];
        let dx=X(x2)-X(x0),dz=Z(y2)-Z(y0);
        const L=Math.hypot(dx,dz)||1;dx/=L;dz/=L;
        const nx=-dz*wHalf,nz=dx*wHalf;
        pos.push(X(x)+nx,.4,Z(y)+nz, X(x)-nx,.4,Z(y)-nz);
      }
      const idx=[];
      for(let i=0;i<seg.length-1;i++){const a=i*2;idx.push(a,a+1,a+2,a+1,a+3,a+2);}
      const gg=new THREE.BufferGeometry();
      gg.setAttribute('position',new THREE.BufferAttribute(new Float32Array(pos),3));
      gg.setIndex(idx);
      scene.add(new THREE.Mesh(gg,new THREE.MeshBasicMaterial({color:0x2A3E78,transparent:true,opacity:.95,depthWrite:false,side:THREE.DoubleSide})));
    }
  }

  /* mestské svetlá — Points, konštantná px veľkosť */
  let dotsMat;
  {
    const pos=new Float32Array(dots.length*3);
    dots.forEach((d,i)=>{pos[i*3]=X(d.x);pos[i*3+1]=1.5;pos[i*3+2]=Z(d.y);});
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.BufferAttribute(pos,3));
    dotsMat=new THREE.PointsMaterial({color:0xFFE9B8,size:2.4,sizeAttenuation:false,
      transparent:true,opacity:0,depthWrite:false});
    scene.add(new THREE.Points(g,dotsMat));
  }

  /* brownfieldy — extrudované, farba/opacita per frame; súkromné majú dashed obrys */
  const items=[];
  const H3=H*S*.006;                          /* jemná výška — 3D pri náklone */
  for(const p of polys){
    const pts=p.pts.map(([x,y])=>new THREE.Vector2(X(x),-Z(y)));
    let mesh=null,dash=null;
    try{
      const shape=new THREE.Shape(pts);
      const g=new THREE.ExtrudeGeometry(shape,{depth:H3,bevelEnabled:false});
      g.rotateX(-Math.PI/2);                  /* (x,y,z)->(x,z,y): extrúzia hore, -Z fix cez -y vyššie */
      const m=new THREE.MeshBasicMaterial({transparent:true,opacity:.5,depthWrite:false});
      mesh=new THREE.Mesh(g,m);scene.add(mesh);
      const eg=new THREE.BufferGeometry().setFromPoints(p.pts.map(([x,y])=>new THREE.Vector3(X(x),H3+.6,Z(y))));
      mesh.userData.edge=new THREE.LineLoop(eg,new THREE.LineBasicMaterial({color:0xFFF6E3,transparent:true,opacity:0,depthWrite:false}));
      scene.add(mesh.userData.edge);
      if(p.own==='private'){
        const lp=p.pts.map(([x,y])=>new THREE.Vector3(X(x),H3+1,Z(y)));
        const lg=new THREE.BufferGeometry().setFromPoints(lp);
        const lm=new THREE.LineDashedMaterial({color:0xFFE9B8,dashSize:S*.002,gapSize:S*.0012,transparent:true,opacity:0});
        dash=new THREE.LineLoop(lg,lm);dash.computeLineDistances();scene.add(dash);
      }
    }catch(e){/* degenerovaný polygón — preskoč */}
    items.push({mesh,dash,t:p.t,phase:p.phase,big:p.big,cx:p.cx,cy:p.cy,col:new THREE.Color(),prevS:0});
  }

  /* ramp helper (rovnaké čísla ako 2D verzia — ramp príde z hlavného súboru) */
  function stateCol(s,out){
    const t=clamp(s)*3,i=Math.min(2,Math.floor(t)),f=t-i,a=ramp[i],b=ramp[i+1];
    out.setRGB(lerp(a[0],b[0],f)/255,lerp(a[1],b[1],f)/255,lerp(a[2],b[2],f)/255);
    return out;
  }

  /* dotykové ripples — akt rozsvietenia (ťuk → svetlo) */
  const RIPS=[];
  {
    const rg=new THREE.RingGeometry(.86,1,40);rg.rotateX(-Math.PI/2);
    for(let i=0;i<18;i++){
      const m=new THREE.Mesh(rg,new THREE.MeshBasicMaterial({color:0xFFE9B8,transparent:true,opacity:0,depthWrite:false}));
      m.visible=false;m.position.y=H3+1;scene.add(m);
      RIPS.push({m,t0:-1});
    }
  }
  let ripI=0;
  function ripple(x,z,now){
    const r=RIPS[ripI++%RIPS.length];
    r.t0=now;r.m.position.x=x;r.m.position.z=z;r.m.visible=true;
  }

  /* composer + bloom */
  const composer=new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene,cam));
  const bloom=new UnrealBloomPass(new THREE.Vector2(2,2),.42,.4,.74);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  let CW=2,CH=2;
  function resize(w,h,dpr){
    CW=w;CH=h;
    renderer.setPixelRatio(Math.min(dpr||1,1.5));  /* bloom na 2× DPR je perf žrút */
    renderer.setSize(w,h,false);
    composer.setSize(w,h);
    cam.aspect=w/h;cam.updateProjectionMatrix();
  }

  const V=new THREE.Vector3();
  function project(x,y){
    V.set(X(x),H3+2,Z(y)).project(cam);
    return {x:(V.x*.5+.5)*CW,y:(-V.y*.5+.5)*CH,vis:V.z<1};
  }

  function frame(st){
    /* kamera: orbit okolo cieľa, výška z pitch, dolly zo zoomu, kurzorová 3D parallaxa */
    const yaw=st.smx*.11+Math.sin(st.t*.00004)*.022;
    const pitch=THREE.MathUtils.degToRad(53)-st.smy*.07;
    const dist=D0/st.camZ;
    const tx=-st.camX*W*S*.9, tz=-st.camY*H*S*.9;  /* zhodný smer s 2D: svet sa hýbe S obsahom */
    cam.position.set(tx+Math.sin(yaw)*dist*Math.cos(pitch),Math.sin(pitch)*dist,tz+Math.cos(yaw)*dist*Math.cos(pitch));
    cam.lookAt(tx,0,tz);

    dotsMat.opacity=st.ctxA*.55;
    init.boundLine.material.opacity=.25+st.ctxA*.5;

    let lit=0;
    for(const it of items){
      const s=clamp((st.wave*1.22-it.t)*3.2);
      if(s>.55)lit++;
      if(!it.mesh)continue;
      const pulse=s<.15?(.5+.28*Math.sin(st.t*.0016+it.phase)):1;
      stateCol(s,it.col);
      it.col.multiplyScalar(.4+s*.78);           /* jas nad 1 → bloom len na prebudených */
      it.mesh.material.color.copy(it.col);
      it.mesh.material.opacity=Math.min(1,(.62+s*.38)*pulse*st.hb);
      it.mesh.userData.edge.material.opacity=s*.8;   /* ostrý obrys — parcela, nie fľak */
      if(it.dash)it.dash.material.opacity=(s<.2?st.own:0)*.95;
      if(s>=.5&&it.prevS<.5&&st.wave>0&&st.wave<1)ripple(X(it.cx),Z(it.cy),st.t);
      it.prevS=s;
    }
    for(const r of RIPS){
      if(r.t0<0)continue;
      const pr=(st.t-r.t0)/950;
      if(pr>=1){r.m.visible=false;r.t0=-1;continue;}
      const sc=(W*S)*(.012+pr*.05);
      r.m.scale.set(sc,1,sc);
      r.m.material.opacity=(1-pr)*(1-pr)*.55;
    }
    composer.render();
    return lit;
  }

  return {frame,project,resize};
}

window.ZazniGL={init};
