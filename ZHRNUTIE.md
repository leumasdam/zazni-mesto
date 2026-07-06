# ZAŽNI MESTO — zhrnutie projektu

> Koncept interaktívnej expozície brownfieldov pre fyzický model Bratislavy v priestore TU-BA.
> Zadanie: Metropolitný inštitút Bratislavy (pohovor). Stav: prezentácia + manuál v MIB identite + funkčný prototyp — hotové.

**Live:**
- https://leumasdam.github.io/zazni-mesto/prezentacia.html — scroll-story prezentácia (13 stupňov; `?step=N` deep-link, `?auto=1` kiosková slučka)
- https://leumasdam.github.io/zazni-mesto/ — dizajn manuál vo vizuálnej identite MIB (štvorcový grid, indigo + koral, clay rendre, drag-otočka expozície)
- https://leumasdam.github.io/zazni-mesto/obrazovka.html — prototyp dotykovej obrazovky (PULZ / OBJAV / VÍZIA)

---

## 1 · Zadanie

Navrhnúť, ako zrozumiteľne, vizuálne a interaktívne komunikovať tému **brownfieldov v Bratislave** („Od nevyužitých území k živým štvrtiam") cez fyzický model mesta, projekciu, tablety/AR, dotykovú obrazovku, web a samotný priestor TU-BA. Hodnotí sa spôsob uvažovania, práca s dátami, návrh UX a prezentácia — nie produkčná dokonalosť.

## 2 · Dátový základ (naštudované z podkladov MIB)

Z **Koncepcie rozvoja brownfieldov (MIB, 2026)** a registra BF (aktualizácia 2022):

- **113 brownfieldov / 580 ha** (≈ 800 futbalových ihrísk); v 2019 to bolo 131 / 629 ha — 39 vyradených (26 z nich späť na trh), 22 nových
- **13 obrov ≥ 8 ha** (Dynamitka-Istrochem, Rázsochy, Filiálka, Vojenská nemocnica, kaštieľ Rusovce…)
- Vlastníctvo: **56 súkromných, 13 mesto, 11 štát, 8 mix** — najväčšia prekážka rozvoja
- **15 s evidovanou envirozáťažou**, až 69 území / 511 ha s možnou kontamináciou
- Typológia: priemysel 32 % (36 území), administratíva 24, doprava 9, poľnohospodárstvo 6, šport 6…
- Klasifikácia CABERNET: **A: 51 · B: 48 · C: 11 · D: 3**
- 8 fáz revitalizácie: participácia → analýza → dočasné využitie → plán → súťaž → dokumentácia → realizácia → evaluácia
- Koncepcia nazýva brownfieldy **„diery v štruktúre mesta"** → priamy vizuálny hook

**Objav:** register MIB je verejne queryovateľný ako ArcGIS Feature Service
(`services8.arcgis.com → BF_aktualizácia_2022_WFL1`, polia NAZOV, VYMERA_HA, DRUH_VLA, P_VYUZITIE, SEZ_POPIS, KLASIFIKAC, ZAMER). Celý koncept beží na **reálnych dátach**, nie na ilustrácii.

## 3 · Koncept: ZAŽNI MESTO

**Svetlo je metafora aj médium.** Projektory nasvecujú model → brownfield = zhasnuté miesto, revitalizácia = rozsvietenie. Mesto na modeli svieti teplou bielou, 113 tmavých dier pulzuje (dýchajú — spia, nie sú mŕtve). Návšteva expozície = akt rozsvecovania.

**Spiaci obri** — hravá ilustračná vrstva: každá typológia je obor (Fabrika, Stanica, Kasáreň, Silo…), oči zavreté = spí, otvorené = žije. Dieťa pochopí obra, urbanista typológiu.

**5 vizuálnych kanálov** — každá dátová dimenzia má vlastný kanál, nikdy sa nebijú:

| Kanál | Nesie | Hodnoty |
|---|---|---|
| farba + svetlo | STAV | spí (indigo, pulz) · drieme (teal) · prebúdza sa (amber) · žije (teplá biela) |
| ikona | TYPOLÓGIA | 10 kategórií pôvodného využitia |
| vzor | RIZIKO | šrafy = evidovaná záťaž · bodky = predpokladaná |
| obrys | VLASTNÍCTVO | plný = mesto · prerušovaný = súkromné · striedaný = mix |
| mierka | VÝMERA | 13 obrov ≥ 8 ha väčšie + menovka |

Poistka prístupnosti: stav nikdy nekomunikuje len farba — vždy aj animácia + oko obra + text.

**Rozdelenie médií:** model ukazuje PRIESTOR · obrazovka dáva KONTROLU · tablet/AR dáva HĹBKU · web dáva POKRAČOVANIE.

**Zážitková slučka (~4 min):** PRITIAHNI → OBJAV → POCHOP → PREDSTAV SI → ZAPOJ SA (hlasovanie „Prebuď obra" — expozícia zbiera preferencie verejnosti = participatívny vstup pre MIB, presne 1. fáza ich vlastnej metodiky).

## 4 · Čo je hotové

### Dizajn manuál (`index.html`) — 13 sekcií, živý dokument
01 Princíp (5 kanálov) · 02 Farby (nočná paleta, kontrasty ≥ AA) · 03 Stavy (animované + mapovanie na polia registra) · 04 Kanály v praxi · 05 Typografia (Space Grotesk + Inter + JetBrains Mono) · 06 Ikony & obri + character sheet (spí / zíva / bdie) · 07 Komponenty · 08 Živá mapa (113 reálnych polygónov z ArcGIS) · 09 Motion tokeny (pulse.slow 4 s, wake.spring 450 ms, wave.sweep…) · 10 Zvuková identita (ambient 55 Hz, chime C–E–G, tick — hrateľné cez WebAudio) · 11 Obrazovka · 12 Tokeny (JSON pre Tokens Studio → Figma) · 13 Škálovateľnosť

### Prototyp dotykovej obrazovky (`obrazovka.html`) — „dirigent modelu"
- **MapLibre GL + OSM vektorové dlaždice**: tmavé 3D mesto s reálnymi budovami a cestnou sieťou, natívny zoom/pan/rotate (scroll, drag, pravé tlačidlo)
- **3 režimy** (IA prevzatá z môjho prvotného Figma konceptu „Brownfieldy Bratislava"): **PULZ** (donut z reálnych čísel: 46 spí / 67 so zámerom + karta Vybrané územie) · **OBJAV** (search + zoznam 113 území + detail s „Kto drží kľúč", mini-timeline Minulosť→Dnes→Vízia, obor sa zobudí hlasovaním) · **VÍZIA** (časová os 1990–2035 + výsledky hlasovania)
- **Viacvrstvová filtrácia**: FARBA (1 aktívna) + PREKRYVY (kombinovateľné: šrafy, menovky, 3D budovy) + FILTRE (kontaminácia × vlastník × rozloha × potenciál — kombinujú sa, platia naprieč režimami)
- Glass UI (tmavé sklo, svetlý text), splash „Od nevyužitých území k živým štvrtiam" s CTA **Rozsvietiť model**, zvuky, hlasy v localStorage
- Pozn.: vyžaduje internet (dlaždice); na expozícii lokálny tile server

### Dáta pipeline
ArcGIS register + OSM (hranica, Dunaj) → Python generátor → `geo.js` (GeoJSON, lon/lat) a `data.js` (SVG projekcia pre manuál). Aktualizácia registra každé 2 roky = expozícia sa prekreslí sama.

## 5 · Kľúčové argumenty škálovateľnosti (na obhajobu)

1. **5 kanálov bez kolízií** — nová dátová dimenzia = nový kanál, nie redizajn
2. **Jeden zdroj pravdy** — tokeny čítajú projekcia, obrazovka, tablet aj web
3. **Data-driven** — stavy mapované na polia ArcGIS registra, auto-aktualizácia
4. **Témovo agnostické** — ten istý engine zajtra ukáže nájomné bývanie či zeleň

## 6 · Ďalší krok: prezentácia (~12 slajdov)

1. Hook „113 zhasnutých miest" → 2. dáta (3 čísla) → 3. koncept ZAŽNI MESTO → 4. spiaci obri → 5. zážitková slučka → 6. rozdelenie médií → 7. vizuálne kanály → 8. ikonografia → 9. tokeny/manuál → 10. use-case + prototyp → 11. technika + škálovateľnosť → 12. čo by som testoval.
Naratív: **evolúcia od prvotného Figma konceptu k systematizovanému design systému na reálnych dátach** (zadanie hodnotí spôsob uvažovania). Doplniť: poster „Ovládaš od okraja" (ergonómia, prístupnosť z vozíka), AR ako koncept-slajd, GPT infografiky (prompty pripravené: systém dát, setup TU-BA, AR ďalekohľad, projekčné vrstvy, slučka, obri).

## 7 · Zdroje

- [Koncepcia rozvoja brownfieldov (MIB, 2026)](https://mib.sk/wp-content/uploads/2026/02/FINAL_Koncepcia-rozvoja-brownfieldov_2026.pdf)
- [ArcGIS Experience — Brownfieldy (grafická časť)](https://experience.arcgis.com/experience/e25edd3fc2e94da483798fd5dbf3500e/page/brownfieldy)
- Register BF: `services8.arcgis.com/pRlN1m0su5BYaFAS/arcgis/rest/services/BF_aktualizácia_2022_WFL1/FeatureServer`
- OpenStreetMap (hranica mesta, Dunaj), OpenFreeMap (vektorové dlaždice)
- Repo: https://github.com/leumasdam/zazni-mesto
