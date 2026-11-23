# Credits

All third-party assets in `assets/` are **CC0 1.0 (public domain)**. No attribution is required; it is given anyway.
The 3D models in `assets/models/` were built for this game from the scripts in `assets/src/` (headless Blender via the
asset-forge tool) and are covered by the game's MIT licence.

| Asset | Source | Author | Licence | Used as |
|---|---|---|---|---|
| [Sandy Gravel 02](https://polyhaven.com/a/sandy_gravel_02) | Poly Haven | Dario Barresi | CC0 | sand channel of `textures/terrain_detail.jpg` |
| [Aerial Grass Rock](https://polyhaven.com/a/aerial_grass_rock) | Poly Haven | Rob Tuytel | CC0 | steppe channel of `textures/terrain_detail.jpg` |
| [Aerial Rocks 02](https://polyhaven.com/a/aerial_rocks_02) | Poly Haven | Rob Tuytel | CC0 | rock channel of `textures/terrain_detail.jpg` |
| [Paper 006](https://ambientcg.com/view?id=Paper006) | ambientCG | Lennart Demes | CC0 | `textures/parchment.webp` (panel grain) |
| [Qwantani Late Afternoon (Pure Sky)](https://polyhaven.com/a/qwantani_late_afternoon_puresky) | Poly Haven | Greg Zaal, Jarod Guest | CC0 | `sky/qwantani_late_afternoon_512.hdr` (downscaled from 1k) |
| [RPG Audio](https://kenney.nl/assets/rpg-audio) | Kenney | Kenney (kenney.nl) | CC0 | `sfx/coins_*.mp3`, `sfx/cloth_*.mp3`, `sfx/leather_*.mp3` |
| [Interface Sounds](https://kenney.nl/assets/interface-sounds) | Kenney | Kenney (kenney.nl) | CC0 | `sfx/click.mp3` |
| [Impact Sounds](https://kenney.nl/assets/impact-sounds) | Kenney | Kenney (kenney.nl) | CC0 | `sfx/step_*.mp3`, `sfx/step_snow_*.mp3` |

## 3D chibi style (stil-3d, 23.11.2026)

The figures in `assets/3d/` were generated for this game with the Gemini app (Nano Banana image model), using a frame of
the game's own song video (Recraft V4.1 Pro, `atolye/muzik-reel/oyunlar/kervan/gorsel/genis.jpg`) as the style and
character reference. Each request asked for an item sheet on a white background; the sheets were cut out and keyed
locally with PIL (`atolye/oyun-stil/kervan/kes.py`).

| File | Tool | Content |
|---|---|---|
| `3d/chibi.webp` | Gemini (Nano Banana), 2 requests: sheet + white-background edit | 3x3 sprite atlas on the map: caravan leader, the three rival merchants, guard, bandit, loaded and unloaded camel, bandit tent |
| `3d/mal-*.webp` | Gemini (Nano Banana), 1 request | market goods (silk, spices, salt, copper, carpets, figs, ceramics), akçe pouch, caravanserai |
| `3d/poz-*.webp` | Gemini (Nano Banana), 1 request | caravan leader and camel busts (title, panels, pause), leader cheering and sad (end card) |

Three.js r170 (MIT) is loaded from jsDelivr. The music, bells, wind and bazaar murmur are still synthesised in code.
