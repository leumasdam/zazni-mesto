# ZAŽNI MESTO

Koncept interaktívnej expozície brownfieldov pre fyzický model Bratislavy v priestore TU-BA (zadanie MIB).

**Live:** https://leumasdam.github.io/zazni-mesto/

- `index.html` — živý dizajn manuál v MIB identite (tokeny, stavy, ikony, obri + clay rendre, motion, zvuk, živá mapa, drag-otočka expozície)
- `prezentacia.html` — kroková scroll-story (13 stupňov; `?step=N` deep-link, `?auto=1` kiosková slučka)
- `obrazovka.html` — funkčný mockup dotykovej obrazovky („dirigent modelu") na reálnych dátach
- `data.js` / `geo.js` — 113 polygónov brownfieldov generovaných z ArcGIS registra MIB (BF_aktualizácia_2022) + hranica BA a Dunaj z OSM
- `audit.mjs` — 64 automatických kontrol konzistencie dát, UI pravidiel a prezentačnej story (`node audit.mjs`)

Dáta: [Koncepcia rozvoja brownfieldov (MIB, 2026)](https://mib.sk/koncepcia-rozvoja-brownfieldov/), register BF 2022 (113 lokalít / 580 ha), OpenStreetMap.
