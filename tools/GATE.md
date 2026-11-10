# tools/gate.mjs: bot regression gate

`tools/smoke.mjs` answers "does the page load with 0 errors". `tools/gate.mjs` answers "does the game still play as
well as before, and can a phone reach its buttons". It exists because on 9 Nov an unreviewed commit made arrows do
0 damage to armoured enemies: the bot fell from wave 15 to wave 8 and smoke stayed green.

## What it checks

1. **sim**: loads the build in headless Chromium with `?auto&debug`, holds `requestAnimationFrame` so wall-clock
   frames cannot advance the game, calls the game's own fast-forward hook (`hisarSim(1260)`) and reads the metrics.
   The candidate runs twice; different numbers mean the sim is not deterministic and the gate fails (a comparison
   would be meaningless). The base runs once (skipped when it is byte-identical to the candidate). Each metric is
   compared with its tolerance (`abs` units or `rel` fraction it may drop, `max` ceiling, `info` not gated).
2. **layout**: at 390×844, 360×740 and 412×915 with `isMobile` + `hasTouch`, every visible element matching
   `GAME.layout.selectors` must be inside the viewport and be what `elementFromPoint` returns at its centre.
3. **console**: every run (sim and layout) must have 0 page errors, 0 console errors and 0 failed requests.
   Analytics and Google Fonts are answered with an empty 200, as in smoke.

Output: `ok` / `FAIL` / `KNOWN` / `note` lines, then `RESULT OK|FAIL`, exit 1 on FAIL. `GATE_JSON=<file>` also writes
a JSON report.

## Running

```sh
node tools/gate.mjs                       # base = origin/main:index.html, candidate = working tree
node tools/gate.mjs --base <ref>          # any git ref
node tools/gate.mjs --baseline            # base = tools/gate-baseline.json (no git base needed)
node tools/gate.mjs --record              # write tools/gate-baseline.json from the working tree (main only)
node tools/gate.mjs --candidate x.html    # test a scratch build without touching index.html
node tools/gate.mjs --only sim|layout
node tools/gate.mjs --strict-layout       # KNOWN layout offenders fail too
SMOKE_CDN_DIR=<npm package dir> ...       # serve three.js from a local copy (no CDN access)
```

Assets (models, images) always come from the working tree; only the entry HTML differs between base and candidate.
Runtime here (4 cores, shared, load average 25-35): 40-80 s per sim run; a full gate is about 4.5 min when the base is
identical (2 sim runs) and up to 9 min with a different base (3 sim runs); `--baseline --only sim` about 3 min.
Timeouts are generous and print as `infra: … timed out` (still a FAIL, never a pass); a whole-run watchdog stops at
15 min. CI runs it as the `gate` job in `.github/workflows/smoke.yml` (PR: base = `HEAD^1`, the base
branch; manual run: `--baseline`).

## This game (kervan)

Ported from kale-savunmasi's `tools/gate.mjs` (only the `GAME` block differs). The timing paragraph above is
kale's; here one sim run takes 10-25 s and a full `--baseline` gate about 1 min.

- **sim**: the rules live in the render-free core between `/*SIM-START*/` and `/*SIM-END*/`
  (`window.KervanCore`). The page loads with `?noassets` (frames held); `run` plays the 'smart' `KervanBot` on seeds
  1-12 with fresh `KervanSim` instances, the same loop as the game's `fastForward` (`bot.tick()`, then
  `advance(1)` hour) until the run is won, bankrupt or out of time. The core has no `Math.random` or `Date.now`; the
  seed drives its RNG streams. The core also runs in Node; the browser is used so that the gate keeps one output format
  and also checks the page (console errors, layout).
- **metrics** (over seeds 1-12): `wins` (must not drop), `stars` (may drop 1), `score` (may drop 10 %),
  `gameErrors` (`window.__errors`, max 0); `winDays`, `bankrupt`, `perSeed` (stars per seed, `b` = bankrupt,
  `t` = timeout) are info.
  Main d9d7951: wins 11 · stars 26 · score 45613 · bankrupt 1 · perSeed 22223b223332. Same as the faz-3 report's
  Node run (11 of 12, seed 6 bankrupt, 4 seeds at 3★); the README's "12 of 12 seeded runs" does not hold for seeds 1-12.
- **Proof it fails**: sale income × 0.8 (`-qt.total * 0.8` in `sell`) bankrupts all 12 seeds: wins 11 → 0,
  stars 26 → 0, score −99.9 %: `RESULT FAIL`.
- **layout**: `?auto&noassets` (the bot starts a game at boot), selectors `#hud button`, `#cvBar button`,
  `#cvBar [role=button]`: 7 elements, all inside and on top on main. No known offenders. Not covered: the HUD plus
  caravan bar taking about 34 % of a phone screen and the first toast over the HUD (faz-3 report, d48e780) are area
  and timing problems, not a button off-screen or covered, and `?auto` shows no start toast.

## Porting to another game

Copy `tools/gate.mjs` and edit only the `GAME` block at the top:

- `entry`, `cdn.match` / `cdn.pkg` (import-map CDN URL and the part before the path inside the npm package),
  `ignored` (requests answered empty).
- `sim.query`: URL flags that start the bot and expose the hook (`?auto&debug`, `?auto&sim`, …).
- `sim.ready` / `sim.run` / `sim.metrics`: in-page functions. `run` must be synchronous (or return a promise) and
  deterministic: fixed time step, seeded RNG, bot on. If the game only has a `?sim=N` URL flag that runs before the
  first frame, put it in `query` and make `run` a no-op. If the core runs in Node, a Node runner is cheaper, but keep
  the same output format.
- `sim.tolerance`: which metrics gate and how much they may drop. Prefer the bot's progress measure (wave, level,
  stars, day), a volume measure (kills, score) and an economy measure (gold, cash). Add the game's own error count
  with `max: 0`.
- `sim.holdFrames`: keep `true` unless the hook needs the render loop.
- `layout.query` / `layout.selectors`: a URL that shows the in-game HUD with no overlay, and the HUD's buttons.
- `layout.known`: only real, already-reported offenders, with the commit and the reason. Never add one to make a
  run green.

Checklist per game:

1. Find the hook (`grep -n "Sim\b\|?sim\|?auto\|selftest" index.html`) and check in the code that it uses a fixed step
   and a seeded RNG (no `Math.random`/`Date.now` in the update path).
2. Run `--only sim` twice on main: the determinism line must say `identical`.
3. Check the numbers against the game's README/report claims; if they differ, write down which is right.
4. `--record` on main and commit `tools/gate-baseline.json`.
5. Prove it fails: a scratch `--candidate` with a known regression (e.g. a revert of a bad relay commit, or damage × 0)
   must give `RESULT FAIL` on a sim metric. Keep the scratch file out of git.
6. Run the layout part; list existing offenders in `layout.known` with their source commit, or fix them first.
7. Add the `gate` job to the game's workflow (chromium only, `timeout-minutes`, `permissions: contents: read`,
   the already pinned `actions/checkout` and `actions/setup-node` SHAs, `fetch-depth: 2`).
