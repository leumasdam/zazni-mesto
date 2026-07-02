# ZAŽNI MESTO — preslov (scroll-story)

**Forma:** prezentacia.html je scroll-story — jedna súvislá cesta, žiadne slajdy.
Scrolluješ pomaly a rozprávaš; mesto na pozadí reaguje na každý pohyb.
**Čas: ~6–8 min príbeh + 3–5 min živé demo prototypu.**

## Dramaturgia
Celá stránka je zážitková slučka expozície prehraná na webe:
**PRITIAHNI → OBJAV → POCHOP → PREDSTAV SI → ZAPOJ SA.**
Mechanika = koncept: scroll doslova rozsvecuje 113 skutočných polygónov registra.

---

## 1 · PRITIAHNI *(stoj na začiatku, nechaj mesto dýchať ~10 s)*

> Toto je Bratislava v noci. Tých 113 tmavých miest, ktoré pomaly pulzujú, nie je ilustrácia —
> je to váš register brownfieldov, polygón po polygóne. Spia. A celý koncept je jedna veta:
> brownfield je zhasnuté miesto — a expozícia je miesto, kde ho ľudia rozsvecujú.
> Presne to teraz urobím scrollom.

*(klik na „Rozsvietiť mesto" alebo začni scrollovať)*

## 2 · OBJAV *(karty sa stierajú zľava, čísla nabiehajú)*

> Najprv rozsah. Stotrinásť brownfieldov — a číslo klesá, v 2019 ich bolo 131;
> mesto sa prebúdza samo, my mu dávame vypypínač. Dokopy 580 hektárov — osemsto futbalových ihrísk.
> Šestnásť z nich sú ťažké váhy: Palma, Mlynské nivy, Istrochem, Filiálka, Matador, Nové Lido.

## 3 · POCHOP *(súkromným územiam sa rozžiaria obrysy)*

> A teraz najdôležitejšie číslo témy: 56 kľúčov drží súkromník — vidíte, ako sa im rozžiarili obrysy.
> Mesto priamo kontroluje len päť a pol percenta plochy. Revitalizácia sa preto nedá nariadiť —
> dá sa len vyjednať a vysvetliť verejnosti prečo. A 66 území už zámer má:
> pozornosť je prvé svetlo, tie sa prebúdzajú prvé.

## 4 · PREDSTAV SI *(scrolluj plynulo — svetelná vlna ide od východu, počítadlo rastie)*

> Sledujte: svetlo ide mestom od východu ako svitanie. Indigo spí… teal drieme — dočasné využitie…
> amber sa prebúdza — zámer… a teplá biela žije. Jas je miera života — to je celý vizuálny jazyk
> expozície v jednom pohybe. Na fyzickom modeli toto kreslia projektory; významné územia sa
> pri prebudení samy pomenujú.

*(nechaj dobehnúť na „113 / 113 svieti")*

## 5 · ZAPOJ SA

> Rozsvietili sme mesto scrollom. Na expozícii to návštevník urobí dotykom a hlasom —
> a každý hlas svieti na modeli a stáva sa dátami pre MIB. Web, ktorý práve vidíte,
> je „pokračovanie" — QR kód z výstavy vedie presne sem. A toto je prototyp expozície…

*(klik „Prototyp expozície" → živé demo)*

## DEMO prototypu (3–5 min, natrénovať)
1. PULZ — donut: „47 spí, 66 sa prebúdza — živé čísla z registra."
2. Farba → Vlastníctvo: „Kto drží kľúč, jedným dotykom."
3. OBJAV → filter „obri 8+ ha" → Dynamitka: fotky šípkami, MINULOSŤ (Nobel 1873),
   BUDÚCNOSŤ (ÚPN → zámer → hlas), 2–3× zahlasovať — počítadlo rastie.
4. VÍZIA — potiahnuť čas 1990 → 2035; odhlasované svietia farbou víťaza.
> „Viem, čo treba overiť: čitateľnosť projekcie na 3D povrchu, fronty pri obrazovke, AR tracking.
> Prototyp je na to, aby sme sa pýtali správne otázky lacno."

---

## Rýchle odpovede na pravdepodobné otázky

- **Odkiaľ sú dáta?** Živé z ArcGIS služby MIB (BF_aktualizácia_2022) + OSM. Konzistenciu stráži audit — 49 automatických kontrol.
- **Prečo hlasovanie, nie je to gýč?** Je to 1. fáza vašej metodiky (participácia) v hravom obale; výstup je dataset preferencií.
- **Prečo brownfieldy na obrazovke svietia, keď majú byť zhasnuté?** Stavy SÚ stupnica zhasnutia (jas = život). Na modeli svieti mesto a diery mlčia; obrazovka figúru obráti, aby sa dalo klikať.
- **Prečo „rozsvecovanie"?** Doslova: každý dotyk rozsvieti kus modelu. Symbolicky: prvé, čo brownfield potrebuje, je pozornosť — register ukazuje, že územia so zámerom sa reálne prebúdzajú (26 vyradených od 2019). „Nerozsvecujete fabriku. Rozsvecujete jej príbeh."
- **Obor má otvorené oči — prečo?** Len ak má územie zámer v registri. Hlasy budia obrov výhradne vo VÍZII. Realita a želanie sa nemiešajú.
- **Fotky?** Wikimedia z okolia (označené); v produkcii pasport MIB.
- **Offline?** Kiosk: lokálny tile server + cache. Scroll-story: čistý vektor/canvas, beží bez internetu.
- **Cena/čas?** Hotové technológie (projektory + web stack); najdrahšia kalibrácia mappingu a tablety; MVP iteratívne — presne ako vznikol tento prototyp.
