---
name: lumina-sfx
description: Find, sculpt, layer, invent and QA game sound effects offline. Use for Web Audio playback, TypeScript Sounds-as-Code, custom WAVs, recorded Foley, engines and RPM, weather, footsteps, creature calls, explosions, weapon reports, reactive game feedback and tactile UI.
---

# Lumina SFX

The skill ships 2,626 deterministic recipes, their credited recording excerpts, and a CPU-only TypeScript renderer. Search, selective installation, remixing, WAV rendering and QA require Node.js 22.12+ and the checkout. They work offline without installing npm packages. Run studio commands from the skill directory. Give `--dest` an absolute path inside the target game.

## 1. Search for the closest base

Search by event, material, perspective and loop state. Read the selected entries' duration, channel count, recording credits, mix role, and native `params` ranges before choosing a base. The [catalog](catalog.json) also publishes the universal `macroControls` once at its root.

```sh
node scripts/search.mjs rain --loop --json
node scripts/search.mjs elimination confirm --json
node scripts/search.mjs --collection "Farm · Harvest" --json
node scripts/install-sfx.mjs concrete-footstep light-rain-loop --dest /path/to/game/src/audio
```

The installer copies the selected recipes, runtime and transitive recording imports. Repeat installs are idempotent. A conflicting local edit stops the install. If the game intentionally maintains a different runtime, choose a separate destination for the new sound family.

For UI, map focus, selection, rejection and confirmation to separate events. Give a credited elimination priority over a simultaneous hit confirm. For vehicles, choose an idle loop, a loaded loop, and distinct actions or contacts. [Event audio](references/event-audio.md) · [Vehicle cues](tasks/MOTION_COMBAT.md)

## 2. Sculpt or remix for the game's world

One base is enough to change a room, attack or scale. Layer up to three when the event has distinct audible parts. The first layer supplies the category, mix target and spectral expectations. Later layers supply supporting details. Each layer can set its own `macros` and native `params`. Top-level macros shape the combined sound. Gains are linear and offsets are in seconds. Keep one audible layer at offset zero. A stack of zero-offset loops remains a loop; other combinations produce one-shots.

| Macro | Range and neutral | What changes |
| --- | --- | --- |
| `punch` | 0–1, neutral 0 | Accents fast attacks relative to the following body |
| `size` | 0–1, neutral 0.5 | Tightens or reinforces low-frequency weight |
| `distance` | 0–1, neutral 0 | Softens high frequencies and brings a delayed reflection into the mix |
| `space` | `dry` (default), `small_room`, `hallway`, `outdoor`, `cavern` | Changes reflection timing, density and decay |
| `grit` | 0–1, neutral 0 | Blends in a saturated signal |
| `speed` | 0.25–4×, neutral 1 | Changes event pace and duration |
| `pitchShift` | −24 to +24 semitones, neutral 0 | Transposes pitch independently of pace |

For a heavier courtyard report or a short interior reflection, start with a single cue. Use the recipe's own DSP controls for the acoustic event and the macros for the setting. A subdued indoor cue might use a small room and low grit. A cartoon pickup can use positive pitch shift, a quicker speed and a dry finish.

```sh
node scripts/remix.mjs long-rifle-shot --id gallery-report --space hallway --punch 0.55 --params '{"tail":0.4}' --dest /path/to/game/src/audio
```

For a layered event, save a JSON design. This example places a quieter metal return 90 ms after the initial report.

```json
{
  "id": "gallery-report-and-ping",
  "name": "Gallery report and metal return",
  "layers": [
    { "id": "long-rifle-shot", "params": { "tail": 0.4 } },
    { "id": "metal-ricochet", "gain": 0.24, "offsetSec": 0.09 }
  ],
  "macros": { "space": "hallway", "punch": 0.55, "size": 0.62 }
}
```

```sh
node scripts/remix.mjs --spec /path/to/design.json --dest /path/to/game/src/audio
```

The CLI checks four seeds, the original and balanced profiles, peak, active loudness and onset or loop boundary before publishing the new recipe. Remixed one-shots have an audible onset in the first millisecond and retain a short de-click ramp. Add `--extremes` to check native control limits as well. A design with a specific spectral brief can set `spectrum`, for example `[{"band":"sub","minShare":0.2}]` for a bass-led cue. Failure returns JSON and a nonzero exit code. The generated TypeScript travels with the game and retains the recording credits.

At runtime, pass `macros` to `new SfxPlayer`, `renderSound` or `renderChannels`. Call-site macro values override the recipe's saved defaults. Native DSP controls stay in `params`. A one-layer remix keeps its native control names; layered controls have names such as `layer1_tail`. Use `renderDurationSec(recipe, macros)` for the effective playback duration.

```ts
import cue from './audio/recipes/gallery-report-and-ping.ts';
import { SfxPlayer, encodeWav, renderChannels } from './audio/engine/index.ts';

// In a browser gesture handler, retain the player between triggers.
await audioContext.resume();
const player = new SfxPlayer(audioContext, cue, { level: 'balanced' });
player.play();

// In Node, write new Uint8Array(wav) to a file. In a browser, use a Blob.
const wav = encodeWav(renderChannels(cue, { seed: 23, macros: { distance: 0.35 } }));
```

## 3. Invent and QA

When search produces no convincing base, choose one of the [eight synthesis patterns](references/recipes-guide.md). Write a default-exported `SoundRecipe` alongside the installed recipes. Its file imports only local primitives, recording modules and helpers. The [source inventory](sources/recordings.json) lists tracked PCM takes, provenance, sample rates and hashes. Optional source downloads belong in the ignored `sources/raw/` directory. After adding a recording module, refresh the inventory with `node --experimental-strip-types scripts/build-sources.mjs`.

For a game-owned recipe, pass the actual TypeScript file to QA. For a new studio recipe, use its ID and rebuild the catalog. Read each failure's seed, setting and measurement, then repair and rerun before wiring the sound to a game event.

```sh
npm run --silent qa -- --file /path/to/game/src/audio/recipes/gallery-report-and-ping.ts --both-levels --extremes
npm run --silent qa -- concrete-footstep --extremes
npm run catalog
```

## Playback, review and studio outputs

Use `level: 'balanced'` for role-based game mix headroom. `play({vary:false})` replays a baseline seed. `setIntensity()` adjusts playback, and `startRepeating()` with `setRpm()` sets repeat cadence. For weather, `SfxBedBlend` crossfades two running loop transports. For the optional 3D bridge, run `npm run bank:3d -- --dest /path/to/game/public/audio` and use the [asset and weather map](references/3d-audio-map.json).

All studio outputs default to `qa/output/` in this checkout. QA reports contain the WAV paths. Use `npm run compare -- --highlights` for a local 20-pair blind listening reel, or `npm run compare -- <baseline-commit> <id> ...` for a custom comparison. Comparisons require the baseline in local Git history. The optional demo supports Y/N review after `npm ci`. [Listening guide](references/listening-review.md)

For a full compressed bank, run `npm run --silent qa -- all --both-levels --extremes --jobs 4` then `npm run bank` with a local FFmpeg encoder. The manifest in `qa/output/opus-bank/` records file hashes, credits and balanced gain. Use WAV when the recipient cannot preserve gapless Opus looping.
