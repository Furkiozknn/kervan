# Kervan

A 3D Silk Road trade-strategy game on a low-poly tabletop map of Anatolia at golden hour. Lead camel caravans between
seven cities, buy low and sell high, hire guards against bandits, build caravanserais and reach the goal before the
end of year five. One `index.html`, Three.js r170 from a CDN, everything else (models, music, sound) made in code.

![Map](docs/map.png)

| | |
|---|---|
| ![Title](docs/title.png) | ![Market](docs/market.png) |
| ![Caravan](docs/caravan.png) | ![Phone](docs/phone.png) |

## How to play

- **Goal:** 10,000 akçe in cash **and** 3 caravanserais of your own before the end of year 5. A faster win earns more
  stars and a higher score. After a win (or when time runs out) you can keep playing in endless mode.
- You start in Konya with one caravan (a merchant on horseback and 3 camels) and 200 akçe.
- Select a caravan (the button at the bottom left, or the rider on the map), then click a city: the caravan follows the
  roads there. The route and the ETA are shown. You can also redirect a caravan that is already on the road.
- Click a city to open its market. Click a good to open its slider: left sells, right buys, and the preview shows the
  total, the average price and how far your trade moves the price.
- Every city produces some goods (cheap, deep stock) and wants others (dear, thin stock). Prices drift, react to what
  you and the three rival merchants sell, and recover slowly, so spread your trade over several routes.
- Camels carry 10 units each and cost upkeep every day. Guards cost upkeep too, but bandits camp on roads you neglect.
- Caravans travel by day. At night they stop at the caravanserai on their road if it is close, otherwise they camp.
- Caravanserais (one on every long road) can be restored and upgraded: they keep bandits away, cut camel upkeep on all
  your caravans, earn a little every day and charge rival caravans for the night.
- Reputation with each city grows with trade and contracts and narrows the buy/sell spread. Cities offer contracts
  such as "deliver 20 carpets to Izmir before the first snow".
- Seasons matter: snow closes the mountain pass between Kayseri and Urfa in winter, spring floods slow the river
  crossings. Plague and festivals change a city's demand for a while.
- If your cash stays below zero and nothing is left to sell, you go bankrupt.

## Controls

| Action | Mouse / touch | Keyboard |
|---|---|---|
| Select caravan | click the rider or a caravan button | `C` cycles caravans |
| Send / open market | click a city (or its label) | Tab to a label, `Enter` |
| Pan | drag | arrows / `WASD` |
| Zoom | wheel / pinch | `+` / `-` |
| Speed | 1x 2x 4x buttons | `1` `2` `3` |
| Pause menu | pause button | `P` / `Esc` (Esc first closes panels) |
| Music / effects / language | settings | `M` / `X` / `L` |
| Fullscreen | settings | `F11` |

Settings (master, music and effects volume, TR / EN, Low / High quality, fullscreen) are saved in `localStorage`
under `arena.kervan.settings`; the run under `arena.kervan.save`, the best score under `arena.kervan.best`.
Turkish is the default language.

## URL flags

| Flag | Effect |
|---|---|
| `?auto` | the game plays itself with a bot that uses the same actions as a player (4x speed, `&speed=N` to change) |
| `?debug` | fps, draw calls, CPU timings and JS errors on screen; `window.kervanSim(seconds)` fast-forwards without rendering |
| `?sim=N` | fast-forward N seconds (at 1x) before the first frame |
| `?low` | no shadows, pixel ratio 1, half the particles and trees |
| `?lang=en` / `?lang=tr` | language |
| `?seed=N` | fixed world seed |
| `?nosave` | do not write the run to `localStorage` |
| `?noassets` | skip the optional models, textures, HDRI and sound files (fully procedural) |

The live state is on `window.kervan` (`kervan.state`, `kervan.sim`, `kervan.info()`).

## Balance

All prices, goods, costs, caravanserai levels, contracts and events live in one table, `ECONOMY`, at the top of the
simulation script. The simulation core does not depend on the renderer, so the same rules run headless in Node:
the `?auto` bot won 12 of 12 seeded runs between day 158 and day 211 (years 2 and 3), while a careless bot that buys
camels and random goods went bankrupt within the first season in every run.

## Running locally

Serve the folder over HTTP (ES modules do not load from `file://`):

```
python -m http.server 8000
```

then open <http://localhost:8000/>.

## How it was made

Built by Claude Opus 5.5 with Claude Code from one prompt: [prompts/kervan.md](prompts/kervan.md). The base game is
fully procedural (the asset pass below only adds optional files on top): the terrain, cities, caravanserais, caravans and bandits are merged or instanced low-poly primitives with
vertex colours, and the ney-and-frame-drum music, camel bells, footsteps, bazaar murmur and wind are synthesised with
the Web Audio API.

## Assets

An optional asset pass adds Blender-built low-poly models (camels with a nodding head, the caravan leader and guards,
caravanserais, a bazaar corner and landmarks for each of the seven cities), a subtle terrain detail texture, a
parchment grain on the panels, a Poly Haven HDRI for the water on the High tier and CC0 sounds for coins, loading,
steps and clicks. They load after the first frame and the procedural versions stay as the fallback (`?noassets`
skips them; the Low tier keeps the procedural models). Licences: [CREDITS.md](CREDITS.md); file list, sizes and fps
before and after: [docs/assets.md](docs/assets.md). Model scripts: `assets/src/`.

## License

MIT, see [LICENSE](LICENSE).
