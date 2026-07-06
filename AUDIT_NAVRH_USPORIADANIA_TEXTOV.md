# ZAŽNI MESTO — audit usporiadania, dizajnu a textov

Stav auditu: 2026-07-06  
Repo: `C:\Users\samue\zazni-mesto`  
Automatický audit: `64 ✓ · 0 ✗`

## 1. Verdikt

Projekt je silný najmä tým, že nepôsobí ako statická prezentácia, ale ako živý argument: dáta, metafora svetla, fyzický model, obrazovka a web sú zviazané do jedného systému. Najpresvedčivejšia veta celého konceptu je stále:

> Brownfield je zhasnuté miesto. Expozícia je miesto, kde ho ľudia rozsvecujú.

Túto vetu odporúčam držať ako hlavnú os a všetko ostatné jej podriadiť. Najväčšie riziko projektu nie je dátová nekonzistencia — audit ju drží veľmi dobre. Riziko je skôr dramaturgická preplnenosť: naraz chceš ukázať scroll-story, dizajn manuál, prototyp, obrov, technológiu, dáta, AR, TU-BA priestor, hlasovanie a škálovateľnosť.

Odporúčanie: pri obhajobe rozlišovať tri úrovne:

1. **Pointa** — rozsvecujeme 113 zhasnutých miest.
2. **Mechanika** — obrazovka ovláda, model zobrazuje, tablet prehlbuje, web pokračuje.
3. **Dôkaz** — reálne dáta, audit, prototyp, tokeny.

## 2. Navrhované logické usporiadanie

### A. Prezentácia pre komisiu, 6–8 min

Toto je najlepší tok pre živé rozprávanie:

1. **Hook: 113 zhasnutých miest**
   - Nezačínať slovom “design system”.
   - Začať mestom, tmou a registrom.
   - Cieľ: komisia okamžite chápe problém.

2. **Rozsah a konflikt**
   - 113 lokalít, 580 ha, 800 ihrísk.
   - Kľúčový konflikt: vlastníctvo, nie len estetika.
   - Cieľ: nejde o pekné svetielka, ale o plánovací problém.

3. **Metafora: ZAŽNI MESTO**
   - Svetlo je dátový jazyk aj fyzické médium projektorov.
   - Cieľ: názov a vizuál dostanú logiku.

4. **Deľba médií**
   - Model = spoločná scéna.
   - Obrazovka = dirigent.
   - Tablet = ďalekohľad.
   - Web = pokračovanie.
   - Cieľ: odstrániť otázku “prečo sa nedotýkať modelu?”

5. **Jazyk vrstiev**
   - Farba/stav, ikona/typológia, vzor/riziko, obrys/vlastníctvo, mierka/význam.
   - Cieľ: dokázať, že systém sa nerozpadne pri ďalších dátach.

6. **Spiaci obri**
   - Dať ich až po dátovej gramatike.
   - Vysvetliť ako verejnú/edukačnú vrstvu, nie ako jadro analytiky.
   - Cieľ: hravosť nepôsobí ako gýč, ale ako preklad pre verejnosť.

7. **Živý prototyp**
   - Ukázať PULZ → OBJAV → detail → VÍZIA.
   - Cieľ: “nie je to len render”.

8. **Škálovateľnosť a čo by som testoval**
   - Jeden zdroj pravdy, audit, lokálny tile server, kalibrácia projekcie.
   - Cieľ: ukázať profesionálnu zrelosť a otvorené riziká.

### B. Web/site mapa pre repo

Aktuálne:

- `prezentacia.html` — hlavný emočný pitch
- `index.html` — dizajn manuál
- `obrazovka.html` — prototyp dotykovej obrazovky
- `obri.html` — character sheet obrov
- `README.md`, `ZHRNUTIE.md`, `PRESLOV.md` — sprievodné texty

Odporúčané pomenovanie v navigácii:

- **Príbeh** → `prezentacia.html`
- **Prototyp obrazovky** → `obrazovka.html`
- **Systém** → `index.html`
- **Spiaci obri** → `obri.html`
- **Zdroj dát / audit** → doplniť krátku sekciu v `README.md` alebo samostatne v manuáli

Ak by z toho bola verejná stránka, hlavný vstup by nemal byť “dizajn manuál”, ale “Príbeh”. Manuál je dôkaz po pointe, nie prvá obrazovka.

## 3. Textové nesúlady a rýchle opravy

### 3.1 Počet audit kontrol

Aktuálne `node audit.mjs` vracia:

> `64 ✓ · 0 ✗`

Nájdené staršie hodnoty:

- `README.md`: `62 automatických kontrol`
- `PRESLOV.md`: `62 automatických kontrol`
- `prezentacia.html`: `64 kontrol` je správne

Navrhovaná oprava:

> `audit.mjs` — 64 automatických kontrol konzistencie dát, UI pravidiel a prezentačnej story (`node audit.mjs`)

### 3.2 Zmena 2019 → 2022/2026

V starších textoch sa objavuje:

> `26 vyradených, 8 nových`

V aktuálnej prezentácii a audite je presnejšia verzia:

> `od 2019 sa 39 vyradilo, z toho 26 sa vrátilo na trh, a 22 nových pribudlo`

Odporúčam zjednotiť všetky sprievodné texty na:

> V roku 2019 bolo v registri 131 brownfieldov. Aktuálny register pracuje so 113 lokalitami: 39 území bolo vyradených, z toho 26 sa reálne vrátilo na trh, a 22 nových pribudlo.

Je to dlhšie, ale omnoho presnejšie.

### 3.3 “Obri” vs “významné brownfieldy”

Dobré je, že manuál už vysvetľuje rozdiel medzi:

- `13 obrov ≥ 8 ha` — pravidlo pozornosti tejto expozície
- `16 významných brownfieldov` — oficiálna kategória z koncepcie

Odporúčam túto poznámku preniesť aj do `PRESLOV.md`, lebo práve tam môže padnúť otázka.

Krátka verzia:

> “Obor” tu nie je oficiálna kategória. Je to expozičné pravidlo: územia nad 8 ha majú menovku a väčší symbol, aby návštevník čítal mierku mesta.

## 4. Navrhované prepisy kľúčových textov

### Hero v prezentácii

Aktuálne jadro je dobré, ale dá sa viac zostrúhať.

Navrhované:

> Bratislava má 113 zhasnutých miest. Nie sú to ilustrácie, ale reálne polygóny registra MIB. Scrollom ich teraz rozsvietime tak, ako ich v TU-BA rozsvieti dotyk návštevníka na obrazovke pri modeli.

CTA:

> Rozsvietiť mesto

Namiesto:

> Rozsvietiť model

“Mesto” lepšie drží názov a emóciu; “model” je technické médium.

### Rozsah

Navrhované:

> 113 lokalít. 580 hektárov. Približne 800 futbalových ihrísk. Toto nie je okrajová téma mesta, ale skrytá vrstva jeho budúceho rastu.

### Vlastníctvo

Navrhované:

> Najväčší problém nie je, že územia sú prázdne. Problém je, kto drží kľúč. Až 56 lokalít je v súkromných rukách; mesto priamo kontroluje len malú časť plochy. Preto revitalizácia nie je príkaz, ale vyjednávanie.

### Deľba médií

Navrhované:

> Model je spoločná mapa. Obrazovka je dirigent. Tablet je ďalekohľad. Web je pokračovanie po návšteve. Každé médium robí iba to, v čom je najsilnejšie.

### Vrstvy svetla

Navrhované:

> Projektor nekreslí efekty. Kreslí dáta. Stav je svetlo, riziko je vzor, vlastníctvo je obrys, typológia je ikona a význam je mierka. Preto sa systém dá rozširovať bez toho, aby sa mapa zmenila na chaos.

### Spiaci obri

Navrhované:

> Spiaci obor je spôsob, ako z odborného registra spraviť niečo zapamätateľné. Urbanista číta typológiu. Dieťa vidí bytosť, ktorá spí, zíva alebo bdie. Oči sa otvoria iba vtedy, keď má územie reálny zámer v registri.

### Záver

Navrhované:

> Cieľom nie je vyrobiť výstavu, ktorá sa po mesiaci vypne. Cieľom je nástroj, ktorý vie znovu načítať register, zmeniť vrstvu dát a ďalej rozprávať mesto.

## 5. Dizajn audit

### Čo funguje

- Názov `ZAŽNI MESTO` je silný, zapamätateľný a fyzicky pravdivý.
- Vizuál nočného mesta, projekcie a svetla sedí na tému brownfieldov.
- “Obrazovka = dirigent” je výborná metafora. Odporúčam ju používať všade konzistentne.
- Dátová gramatika je jasná: farba, vzor, obrys, ikona, mierka.
- `prezentacia.html` má dobrú energiu a vie sama o sebe pôsobiť ako demo.

### Čo oslabiť

- Menej hovoriť naraz o všetkých médiách. Najprv model + obrazovka, až potom tablet/AR/web.
- “Spiaci obri” nedávať príliš skoro. Ak prídu pred dátovou logikou, môžu pôsobiť ako maskot. Ak prídu po nej, sú skvelý preklad komplexity.
- Neopakovať “nie je to ilustrácia” príliš často. Stačí raz silno, potom dokazovať auditom a prototypom.

### Vizuálne odporúčania

- V prezentácii ešte viac zvýrazniť prvý kontakt: jeden veľký moment “113” a až potom karta s 580/800.
- Pri kartách znížiť počet vysvetľujúcich viet. Karta má byť dôkaz, preslov má niesť príbeh.
- Pri `index.html` rozdeliť manuál na “Foundation / Components / Experience / Proof”. Teraz je 13 sekcií dobrých, ale pre rýchle čítanie sú rovnocenné.

Navrhované členenie manuálu:

1. **Foundation** — princíp, farby, stavy, typografia
2. **Data Grammar** — kanály, riziko, vlastníctvo, význam
3. **Characters** — ikony a obri
4. **Interfaces** — komponenty, obrazovka, živá mapa
5. **Motion & Sound** — choreografia, zvuk
6. **System Proof** — tokeny, škálovateľnosť, audit

## 6. Animation audit

### Čo funguje

- Kroková navigácia je vhodná pre obhajobu. Jeden vstup = jeden stupeň.
- Svetelná vlna je najsilnejší moment. Treba ju nechať dýchať.
- Turntable a vrstvy svetla dobre vysvetľujú fyzickosť expozície.
- `?step=N`, `?auto=1`, `?lite=1`, `?silent=1` sú veľmi praktické prezentačné poistky.

### Riziká

- Ak sa všetko hýbe rovnako “slávnostne”, stráca sa hierarchia.
- Dlhé dojazdy sú krásne na nahrávke, ale v rozhovore môžu pôsobiť ako oneskorenie.
- Zvuk je pekný detail, ale na pohovore ho odporúčam mať vypnutý, kým si si istý miestnosťou.

### Odporúčané tempo

- Hero: 8–10 s pokoj.
- Objav/Pochop: 25–35 s spolu.
- Svetelná vlna: nechať dobehnúť, neprekliknúť.
- Legenda/Obor/Turntable/Vrstvy: každé len jedna veta + jedna interakcia.
- Prototyp: neukazovať všetko, len jeden silný prípad.

Odporúčané URL pre istotu:

`prezentacia.html?lite=1&silent=1`

Plná verzia:

`prezentacia.html`

## 7. Prototyp audit

### Čo ukázať v deme

1. PULZ: “toto je aktuálny stav registra”.
2. OBJAV: filter `obri 8+ ha` alebo konkrétna lokalita.
3. Detail: Minulosť / Dnes / Budúcnosť.
4. VÍZIA: hlasovanie a časová os.

### Čo radšej neukazovať pri prvom deme

- Všetky filtre.
- Všetky typológie.
- Commons fotky do hĺbky.
- Každú dátovú vrstvu v zozname.

Komisia si musí odniesť mechaniku, nie celý katalóg.

## 8. Najbližšie odporúčané úpravy

### P0 — opraviť pred prezentáciou

1. Zjednotiť počet kontrol na `64`.
2. Zjednotiť štatistiku 2019 → aktuálny register:
   - `131 → 113`
   - `39 vyradených`
   - `26 z nich späť na trh`
   - `22 nových`
3. Do `PRESLOV.md` doplniť rozdiel `13 obrov` vs `16 významných brownfieldov`.

### P1 — zvýšiť presvedčivosť

1. Skrátiť texty na kartách v prezentácii o 20–30 %.
2. Presunúť “obrov” v rozprávaní až po vysvetlení dátovej gramatiky.
3. Pridať do záveru explicitné “čo by som testoval”:
   - čitateľnosť projekcie na 3D povrchu
   - priepustnosť pri dotykovej obrazovke
   - kalibráciu projektorov
   - offline režim dlaždíc

### P2 — repo/údržba

1. Rozdeliť `prezentacia.html` na menšie časti až po pohovore; teraz by to zbytočne riskovalo.
2. Optimalizovať `hero.mp4` alebo pripraviť menšiu fallback verziu.
3. Pridať krátky `RUNBOOK.md`:
   - ako spustiť lokálne
   - bezpečné URL parametre
   - demo scenár
   - čo robiť, ak internet/map tiles padnú

## 9. Krátky finálny pitch

> ZAŽNI MESTO je interaktívny systém pre fyzický model Bratislavy v TU-BA. Z reálneho registra brownfieldov robí čitateľnú svetelnú scénu: model ukazuje priestor, obrazovka ho riadi, tablet otvára detail a web pokračuje po návšteve. Návštevník nepozerá na dáta zvonka — vlastným dotykom rozsvecuje miesta, o ktorých sa má mesto rozhodnúť.

