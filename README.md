<p align="center">
  <a href="https://furkiozknn.github.io/kervan/">
    <img src="docs/card.jpg" width="100%" alt="Kervan: lead camel caravans across Anatolia, buy low, sell high. Click to play in your browser.">
  </a>
</p>

<p align="center">
  <a href="https://furkiozknn.github.io/kervan/"><img src="https://img.shields.io/badge/%E2%96%B6_Play_free-in_your_browser-D97706?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=2B1D12" height="40" alt="Play free in your browser"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Three.js-r170-E9B65C?style=for-the-badge&logo=threedotjs&logoColor=white&labelColor=2B1D12" alt="Three.js r170">
  <img src="https://img.shields.io/badge/built_by-Claude_Opus_5.5-B45309?style=for-the-badge&logo=claude&logoColor=white&labelColor=2B1D12" alt="Built by Claude Opus 5.5">
  <a href="LICENSE"><img src="https://img.shields.io/badge/licence-MIT-7FBF6A?style=for-the-badge&labelColor=2B1D12" alt="MIT licence"></a>
  <img src="https://img.shields.io/badge/no_install-desktop_%C2%B7_phone-FBF1E0?style=for-the-badge&labelColor=2B1D12" alt="No install, desktop and phone">
</p>

<!-- portals:start -->
<p align="center">
  Also on: <a href="https://furkiozknn.itch.io/kervan"><strong>itch.io</strong></a>
</p>
<!-- portals:end -->

<p align="center">
  <strong>A 3D Silk Road trade game on a low-poly map of Anatolia at golden hour: lead camel caravans between seven cities, buy low, sell high and build caravanserais before the end of year five.</strong>
</p>

<!-- gameplay gif -->
<p align="center">
  <sub>Watch the promo: <a href="https://github.com/Furkiozknn/social-videos/releases/download/promo-2026-10/2026-10-27-kervan-en.mp4">EN</a> &middot; <a href="https://github.com/Furkiozknn/social-videos/releases/download/promo-2026-10/2026-10-27-kervan-tr.mp4">TR</a></sub>
</p>

## Features

- **Seven cities, one living market:** Trade across Bursa, Izmir, Konya, Aksaray, Göreme, Kayseri and Urfa, competing against 3 rival merchants whose automated trades shift prices and dynamic supply/demand across the plateau.
- **Caravan logistics & hazards:** Start from Konya with 1 caravan, 3 camels carrying 10 units each, and 200 akçe; manage daily camel and guard upkeep, fend off road bandits, and navigate seasonal hazards like winter snow closing the Kayseri–Urfa pass.
- **Caravanserai network & victory:** Amass 10,000 akçe in cash and build or restore 3 caravanserais before the end of year 5 to win, cut camel upkeep across all routes, and charge rival merchants for overnight stays.
- **Rigorous bot-tested economy:** The automated `?auto` bot plays with identical player actions and won 12 of 12 seeded runs between day 158 and day 211 (day 142 on seed 5, day 212 on seed 3) with 0 JS errors, while a careless bot went bankrupt in the first season every time.
- **Ultra-lean web performance:** A single `index.html` running Three.js r170 delivering ~60 fps at 25–29 draw calls on Intel UHD 620 (1280x720, 110k &rarr; 132k triangles; 27 calls on `?low`), with an optional 1,090 KB asset pass under a 3 MB budget.

## How to play

> [!TIP]
> **Goal:** Reach 10,000 akçe in cash **and** build or restore 3 caravanserais of your own before the end of year 5. A faster win earns more stars and a higher score; afterwards you can keep playing in endless mode.

1. **Dispatch caravans:** Select a caravan (click the rider or press `C`), then click any connected city on the map to send it on its way with route and ETA displayed.
2. **Trade the bazaar:** Click a city to open its market. Drag a good's slider left to sell or right to buy; preview totals, average prices, and price movements before confirming.
3. **Expand and protect:** Restore caravanserais on long roads to shelter caravans at night, cut upkeep, and collect fees from rivals; hire guards to ward off bandits on neglected routes.

<details>
<summary><b>Economy and rules</b></summary>

- **Supply and demand:** Every city produces some goods (cheap, deep stock) and wants others (dear, thin stock). Prices drift, react to what you and the three rival merchants sell, and recover slowly, so spread your trade over several routes.
- **Caravan upkeep & bandits:** Camels carry 10 units each and cost upkeep every day. Guards cost upkeep too, but bandits camp on roads you neglect.
- **Day and night travel:** Caravans travel by day. At night they stop at the caravanserai on their road if it is close, otherwise they camp.
- **Caravanserais:** Caravanserais (one on every long road) can be restored and upgraded: they keep bandits away, cut camel upkeep on all your caravans, earn a little every day and charge rival caravans for the night.
- **Reputation & contracts:** Reputation with each city grows with trade and contracts and narrows the buy/sell spread. Cities offer contracts such as "deliver 20 carpets to Izmir before the first snow".
- **Seasons & events:** Seasons matter: snow closes the mountain pass between Kayseri and Urfa in winter, spring floods slow river crossings. Plague and festivals change a city's demand for a while.
- **Bankruptcy:** If your cash stays below zero and nothing is left to sell, you go bankrupt.

</details>

### Controls

| Action | Mouse / touch | Keyboard |
|---|---|---|
| Select caravan | Click rider or caravan button | `C` cycles caravans |
| Send / open market | Click city (or label) | Tab to label, `Enter` |
| Pan | Drag | Arrows / `WASD` |
| Zoom | Wheel / pinch | `+` / `-` |
| Speed | 1x 2x 4x buttons | `1` `2` `3` |
| Pause menu | Pause button | `P` / `Esc` (Esc first closes panels) |
| Music / effects / language | Settings | `M` / `X` / `L` |
| Fullscreen | Settings | `F11` |

- **Global hotkeys:** `P` / `Esc` pause, `M` music, `X` effects, `L` language, `1` `2` `3` speed (1x, 2x, 4x), `C` cycle caravans.
- **Persistence:** Settings (master, music and effects volume, TR / EN, Low / High quality, fullscreen) are saved in `localStorage` under `arena.kervan.settings`; the run under `arena.kervan.save`, the best score under `arena.kervan.best`. Turkish is the default language.

<details>
<summary><b>URL flags for testing</b></summary>

| Flag | Effect |
|---|---|
| `?auto` | The game plays itself with a bot that uses the same actions as a player (4x speed, `&speed=N` to change) |
| `?debug` | FPS, draw calls, CPU timings and JS errors on screen; `window.kervanSim(seconds)` fast-forwards without rendering |
| `?sim=N` | Fast-forward N seconds (at 1x) before the first frame |
| `?low` | No shadows, pixel ratio 1, half the particles and trees |
| `?lang=en` / `?lang=tr` | Start language |
| `?seed=N` | Fixed world seed |
| `?nosave` | Do not write the run to `localStorage` |
| `?noassets` | Skip the optional models, textures, HDRI and sound files (fully procedural) |

The live state is on `window.kervan` (`kervan.state`, `kervan.sim`, `kervan.info()`).

</details>

## Screenshots

<table>
  <tr>
    <td width="33%"><img src="docs/title.png" alt="Title screen"><br><sub>Title screen</sub></td>
    <td width="33%"><img src="docs/map.png" alt="The map with seven cities"><br><sub>Seven cities on one map</sub></td>
    <td width="33%"><img src="docs/market.png" alt="Caravan panel and the Konya market"><br><sub>Caravan panel and the Konya market</sub></td>
  </tr>
  <tr>
    <td><img src="docs/caravan.png" alt="A camel caravan leaving Kurşunlu Han on the coast"><br><sub>A caravan at Kurşunlu Han</sub></td>
    <td><img src="docs/assets-after-city-goreme.png" alt="Fairy chimneys of Göreme"><br><sub>Fairy chimneys of Göreme</sub></td>
    <td><img src="docs/assets-after-city-bursa.png" alt="Bursa with the Ulu Cami"><br><sub>Bursa and its Ulu Cami</sub></td>
  </tr>
  <tr>
    <td><img src="docs/assets-after-han.png" alt="A restored caravanserai"><br><sub>A restored caravanserai</sub></td>
    <td><img src="docs/assets-after-night.png" alt="Night at the Kayseri citadel"><br><sub>Night at Kayseri</sub></td>
    <td><img src="docs/assets-after-market.png" alt="Konya market in Turkish"><br><sub>Konya market (Turkish UI)</sub></td>
  </tr>
</table>

## Redesign & Performance

**Art direction:** A stylized Silk Road adventure in warm dune sand (`#E0B97A`), terracotta (`#B4532A`), oasis green (`#2F8F6B`), night indigo (`#1B1F3B`) and lantern light (`#FFB347`); the UI is a travel journal of parchment panels and stitched leather buttons.

**Visual updates (rules, controls, bot, and saves are untouched):**
- **Palette and light:** The five-colour palette on every material, a rim light, drifting cloud shadows and an indigo night tint.
- **Environment:** The plateau rises from a dune sea with sandstone strata; desert dune ridges, four palm oases and wind-blown sand; the dunes hidden under the board are collapsed so they cost almost nothing.
- **Characters, objects and FX:** Rounded pacing camels with saddle blankets, blind arcades on the caravanserais, night camps with tents and embers, and an inked route line that marches toward the destination.
- **UI skin:** Parchment panels, stitched leather buttons and a self-hosted Marcellus display face (OFL) on every screen; compact top bar and bottom sheet on phones in portrait and short landscape.

**Measured on an Intel UHD 620 (headless Chrome, 1280x720, seed 3):**
- Page rAF: ~60 fps before and after (the vsync cap; 61.0 fps with assets)
- Draw calls: 25 &rarr; 29 (start view: 19–21 &rarr; 20–25 calls)
- Geometry: 110k &rarr; 132k triangles (`?low`: 27 calls, 92k triangles)
- `?auto` bot finishes with 0 JS errors, with and without `?noassets` (day 212 for seed 3, day 142 for seed 5).

<p align="center">
  <img src="docs/redesign-before-after.png" width="100%" alt="The same map at the same hour before and after the redesign">
  <br>
  <sub>Same seed, same hour: before (left) and after (right)</sub>
</p>

<details>
<summary><b>Redesign gallery and phone layout</b></summary>

<table>
  <tr>
    <td width="50%"><img src="docs/redesign-desert.png" alt="Urfa among the oases"><br><sub>Urfa and its oases</sub></td>
    <td width="50%"><img src="docs/redesign-night.png" alt="A caravan camped at night"><br><sub>Night camp</sub></td>
  </tr>
  <tr>
    <td><img src="docs/redesign-pause.png" alt="Pause menu"><br><sub>Pause</sub></td>
    <td><img src="docs/redesign-settings.png" alt="Settings"><br><sub>Settings</sub></td>
  </tr>
  <tr>
    <td><img src="docs/redesign-end.png" alt="Victory screen"><br><sub>Victory</sub></td>
    <td><img src="docs/phone.png" alt="Kervan on a phone"><br><sub>Phone, portrait</sub></td>
  </tr>
</table>

<table>
  <tr>
    <td width="50%"><img src="docs/assets-before-han.png" alt="Caravanserai before the asset pass"><br><sub>Caravanserai, procedural</sub></td>
    <td width="50%"><img src="docs/assets-after-han.png" alt="Caravanserai after the asset pass"><br><sub>Caravanserai, with the asset pass</sub></td>
  </tr>
  <tr>
    <td><img src="docs/assets-before-city-konya.png" alt="Konya before the asset pass"><br><sub>Konya, procedural</sub></td>
    <td><img src="docs/assets-after-city-konya.png" alt="Konya after the asset pass"><br><sub>Konya, with the asset pass</sub></td>
  </tr>
</table>

</details>

## Running locally

Serve the folder over HTTP (ES modules do not load from `file://`):

```bash
python -m http.server 8000
```

Then open <http://localhost:8000/>.

## Made with Claude Code

Built by **Claude Opus 5.5** with Claude Code from one prompt: [prompts/kervan.md](prompts/kervan.md). The base game is fully procedural: the terrain, cities, caravanserais, caravans and bandits are merged or instanced low-poly primitives with vertex colours, and the ney-and-frame-drum music, camel bells, footsteps, bazaar murmur and wind are synthesised with the Web Audio API.

### Asset pass & Simulation

An optional asset pass adds Blender-built low-poly models (camels with a nodding head, the caravan leader and guards, caravanserais, a bazaar corner and landmarks for each of the seven cities), a subtle terrain detail texture, a parchment grain on the panels, a Poly Haven HDRI for the water on the High tier and CC0 sounds. They load after the first frame and procedural versions stay as fallback (`?noassets` skips them; the Low tier keeps procedural models). Licences: [CREDITS.md](CREDITS.md); file list, sizes and fps before and after: [docs/assets.md](docs/assets.md). Model scripts: `assets/src/`.

<details>
<summary><b>Technical notes & Balance</b></summary>

- **Simulation core:** All prices, goods, costs, caravanserai levels, contracts and events live in one table, `ECONOMY`, at the top of the simulation script. The simulation core does not depend on the renderer, so the same rules run headless in Node.
- **Fair AI tested by bot:** The `?auto` bot won 12 of 12 seeded runs between day 158 and day 211 (years 2 and 3), while a careless bot that buys camels and random goods went bankrupt within the first season in every run.
- **Performance budget:** Shipped asset total is 1,090 KB against a 3 MB budget. Flat normals are recomputed at load (`src/slim_glb.py`), keeping GLB sizes tiny (camel 36.5 KB, riders 43.2 KB, han 81.7 KB). All models are merged into existing meshes or swapped into existing `InstancedMesh` nodes, adding only one draw call.

</details>

### Claude Game Arena

Kervan is part of the **Claude Game Arena** series, where each game is built by a Claude model from one prompt.

[Hisar](https://furkiozknn.github.io/kale-savunmasi/) · [Çay Ocağı](https://furkiozknn.github.io/cay-ocagi/) · [Çini Ustası](https://furkiozknn.github.io/cini-ustasi/) · [Martı](https://furkiozknn.github.io/marti/) · [Dolmuş](https://furkiozknn.github.io/dolmus/) · [Peri Golf](https://furkiozknn.github.io/peri-golf/) · [Mehter](https://furkiozknn.github.io/mehter/) · [Boğaz Vapuru](https://furkiozknn.github.io/bogaz-vapuru/) · [Simit Fırını](https://furkiozknn.github.io/simit-firini/) · [Karagöz](https://furkiozknn.github.io/karagoz/) · [Lale Bahçesi](https://furkiozknn.github.io/lale-bahcesi/)

**Round 5:** [Kapadokya Balonu](https://furkiozknn.github.io/kapadokya-balonu/) · [Ebru](https://furkiozknn.github.io/ebru/) · [Kırkpınar](https://furkiozknn.github.io/kirkpinar/) · [Çarşı Kaçışı](https://furkiozknn.github.io/carsi-kacisi/)

**Round 6:** [Topkapı Gecesi](https://furkiozknn.github.io/topkapi-gecesi/) · [Hamsi](https://furkiozknn.github.io/hamsi/) · [Pamukkale](https://furkiozknn.github.io/pamukkale/) · [Mimar Sinan](https://furkiozknn.github.io/mimar-sinan/)

## License

MIT, see [LICENSE](LICENSE). Third-party assets are CC0, see [CREDITS.md](CREDITS.md).

Like the game? You can support new rounds on [Buy Me a Coffee](https://buymeacoffee.com/furkiozkann). The game stays free.
