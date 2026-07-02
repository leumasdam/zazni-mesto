// ZAŽNI MESTO — audit konzistencie dát a UI
// spusti: node audit.mjs
// Kontroluje: geo.js (zdroj pre prototyp) ↔ data.js (manuál) ↔ čísla natvrdo v UI/prezentácii ↔ pravidlá.
import {readFileSync} from 'fs';

let pass=0, fail=0;
const ok=(name,cond,detail='')=>{
  if(cond){pass++;console.log(`  ✓ ${name}`);}
  else{fail++;console.log(`  ✗ ${name} ${detail?'— '+detail:''}`);}
};
const count=(arr,fn)=>arr.filter(fn).length;
const tally=(arr,key)=>arr.reduce((a,f)=>((a[f[key]]=(a[f[key]]||0)+1),a),{});

const src=f=>readFileSync(f,'utf8');
const GEO=JSON.parse(src('geo.js').match(/const BFGEO=(\{.*?\});\r?\n/s)[1]);
const DATA=JSON.parse(src('data.js').match(/const MAPDATA = (\{.*\});/s)[1]);
const OBR=src('obrazovka.html');
const PRE=src('prezentacia.html');

const F=GEO.features.map(f=>f.properties);

console.log('\n— A · GEO.JS (zdroj prototypu) —');
ok('113 území',F.length===113,`je ${F.length}`);
ok('unikátne id 0..112',new Set(F.map(f=>f.id)).size===113);
ok('15 s envirozáťažou',count(F,f=>f.sez===1)===15,`je ${count(F,f=>f.sez===1)}`);
const cls=tally(F,'cls');
ok('CABERNET A:51 B:48 C:11 D:3',cls.A===51&&cls.B===48&&cls.C===11&&cls.D===3,JSON.stringify(cls));
const own=tally(F,'own');
ok('vlastníctvo 56/25/13/11/8',own.private===56&&own.other===25&&own.city===13&&own.state===11&&own.mixed===8,JSON.stringify(own));
const typ=tally(F,'typ');
ok('priemysel 36 · admin 24 · doprava 9',typ.industry===36&&typ.office===24&&typ.transport===9,JSON.stringify(typ));
const sumHa=F.reduce((a,f)=>a+f.ha,0);
ok('výmera ~580 ha',sumHa>574&&sumHa<586,`je ${Math.round(sumHa)}`);
ok('plan konzistentný so ZAMER (všetkých 113)',F.every(f=>f.plan===((f.zamer&&!/^nezisten/i.test(f.zamer))?1:0)));
const big=F.filter(f=>f.ha>=8);
ok('obri 8+ ha = 13',big.length===13,`je ${big.length}`);
ok('wy (rok prebudenia) v 2024–2035',F.every(f=>f.wy>=2024&&f.wy<=2035));
const inBox=f=>f.lon>16.9&&f.lon<17.31&&f.lat>47.94&&f.lat<48.3;
ok('všetky centroidy vnútri BA bboxu',F.every(inBox));

console.log('\n— B · DATA.JS (manuál) vs GEO.JS —');
ok('rovnaký počet území',DATA.bf.length===F.length);
ok('rovnaký počet sez',count(DATA.bf,f=>f.sez===1)===15);
ok('rovnaké názvy (množina)',(()=>{
  const a=new Set(F.map(f=>f.n)),b=new Set(DATA.bf.map(f=>f.n));
  return a.size===b.size&&[...a].every(n=>b.has(n));
})());

console.log('\n— C · ČÍSLA NATVRDO V UI (obrazovka.html) —');
const grab=re=>{const m=OBR.match(re);return m?+m[1]:null;};
ok(`filter „kontaminované (15)"`,grab(/Len kontaminované \((\d+)\)/)===15);
ok(`filter „Mesto (13)"`,grab(/Mesto \((\d+)\)/)===own.city);
ok(`filter „Súkromné (56)"`,grab(/Súkromné \((\d+)\)/)===own.private);
ok(`filter „Štát (11)"`,grab(/Štát \((\d+)\)/)===own.state);
ok(`filter „Mix (8)"`,grab(/Mix \((\d+)\)/)===own.mixed);
ok(`filter „A (51)"`,grab(/A \((\d+)\)/)===cls.A);
ok(`legenda „B (48)" „C (11)" „D (3)"`,OBR.includes(`B (${cls.B})`)&&OBR.includes(`C (${cls.C})`)&&OBR.includes(`D (${cls.D})`));
ok(`štatistika „13 území nad 8 ha"`,OBR.includes('<b>13</b>území nad 8 ha')&&big.length===13);
ok(`splash „113 / 580 ha / 15"`,OBR.includes('<b>113</b>')&&OBR.includes('<b>580 ha</b>')&&OBR.includes('<b>15</b>'));

console.log('\n— D · PRAVIDLÁ ZOBRAZENIA (invarianty v kóde) —');
ok('obri: veľkí z diaľky (≥8 ha), zblízka všetci',OBR.includes(`filter:['>=',['get','ha'],8]`)&&OBR.includes(`bf-obri-all`)&&OBR.includes(`filter:['<',['get','ha'],8]`));
ok('OBJAV/PULZ: bdie len plan==1 (realita registra)',/const real=\['case',\['==',\['get','plan'\],1\],'awake','sleep'\]/.test(OBR));
ok('hlasy budia obra LEN vo VÍZII',/mode==='vizia'&&voted\.length/.test(OBR));
ok('avatar v karte = LEN realita registra (plan)',OBR.includes(`obor-face \${p.plan?'awake':''}`)&&!OBR.includes(`(p.plan||total)?'awake'`)&&!OBR.includes(`face.classList.add('awake')`));
ok('DNES vysvetľuje zámer priamo',OBR.includes('ZNÁMY ZÁMER')&&OBR.includes('„Zámer" = investičný alebo územnoplánovací krok'));
ok('VÍZIA: simulácia + vynulovanie hlasov',OBR.includes('simVotes')&&OBR.includes('clrVotes')&&OBR.includes('zazni-votes-sim'));
ok('šrafy viazané na sez==1',OBR.includes(`filter:['==',['get','sez'],1]`));
ok('zoznam OBJAV používa obrov (nie staré ikony)',OBR.includes('oborArt(p.typ,p.plan===1,34')&&!OBR.includes('aveyes'));
ok('nfunk (ÚPN) vyplnené pre všetkých 113',F.every(f=>f.nfunk&&f.nfunk.length>3));
ok('detail má leteckú snímku + sekcie M/D/B',OBR.includes('World_Imagery/MapServer/export')&&OBR.includes('MINULOSŤ <i>')&&OBR.includes('BUDÚCNOSŤ <i>'));
ok('karusel snímok (Z NEBA/OKOLIE/ORTOFOTO SR)',OBR.includes('ORTOFOTO SR')&&OBR.includes('data-ph')&&OBR.includes('zbgis_ortofoto_wms'));
ok('skutočné fotky z Commons (geosearch + cache + fallback)',OBR.includes('commons.wikimedia.org')&&OBR.includes('PHCACHE')&&OBR.includes('img.onerror'));
ok('kurátorské príbehy + šablóny typológií',OBR.includes('Dynamitfabrik')&&OBR.includes('konskej železnice')&&OBR.includes('PAST_T'));
ok('klik do prázdnej mapy zatvára detail',OBR.includes(`queryRenderedFeatures(e.point,{layers:['bf-fill']})`));
ok('prepínač času MINULOSŤ/DNES/BUDÚCNOSŤ',OBR.includes('data-t="past"')&&OBR.includes('data-t="fut"')&&OBR.includes('detailPane'));
ok('počítadlo hlasov (počty, nie 1 hlas)',OBR.includes('voteTotal')&&OBR.includes('(votes[selIdx][b.dataset.v]||0)+1')&&OBR.includes('cntbig'));
ok('budúcnosť = 3 vrstvy (ÚPN → zámer → hlas)',OBR.includes('1 · ÚZEMNÝ PLÁN URČUJE')&&OBR.includes('2 · ZÁMER VLASTNÍKA')&&OBR.includes('3 · HLAS VEREJNOSTI'));
ok('každá typológia obrov má telo v OBODY',(()=>{
  const bodies=[...OBR.matchAll(/^\s{2}(\w+):\{b:'/gm)].map(m=>m[1]);
  return [...new Set(big.map(f=>f.typ))].every(t=>bodies.includes(t));
})());

console.log('\n— E · PREZENTÁCIA (čísla na slajdoch) —');
ok('slajd 113',PRE.includes('num:n2:113'));
ok('slajd 580 sedí so sumou',PRE.includes('num:n3:580')&&Math.round(sumHa)>=579&&Math.round(sumHa)<=580);
ok('slajd 15 = sez',PRE.includes('num:n4:15'));
ok('slajd 56 = súkromní',PRE.includes('num:n5:56')&&own.private===56);
ok('mapové režimy big/sez/private existujú',['m3:big','m4:sez','m5:private'].every(s=>PRE.includes(s)));

console.log(`\n${'='.repeat(46)}\nVÝSLEDOK: ${pass} ✓ · ${fail} ✗\n`);
process.exit(fail?1:0);
