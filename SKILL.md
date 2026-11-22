---
name: lumina-sfx
description: Find, sculpt, layer, invent and verify offline game sound effects. Use for Web Audio and Three.js, Godot, Unity, Unreal, Pygame, WAV or Opus delivery, recorded Foley, weather, vehicles, impacts, farming, animals, reactive UI, and custom audio recipes.
---

# Lumina SFX

Run the studio commands from this skill's directory using Node.js 22.12+. Pass the absolute game path to `--project` or `--dest`. Core search, WAV rendering, selective install and QA work offline from the checkout. The game uses the assets or code you install. The user can keep their existing audio manager.

## 1. Search for the closest performance

Start with the game event, surface, perspective and foreground/background role. Search uses all supplied words. Broaden the query if the first one returns nothing. Each catalog entry supplies an ID, duration, loop flag, tags, controls, and recording credits when relevant.

```sh
node scripts/search.mjs seed planting --json
node scripts/search.mjs rain --loop --json
node scripts/search.mjs --collection "Farm · Harvest" --json
```

For a close match, install only the required IDs. Playback helpers accept three-variant pools, positions, and live loop controls. The game still needs to call the helper on its actual success, collision, movement or state transition. Use one persistent player per repeating event where appropriate.

```sh
node scripts/install-sfx.mjs plant-large-seeds light-rain-loop --project /absolute/path/to/game
node scripts/install-sfx.mjs plant-large-seeds --engine wav --dest /absolute/path/to/game/audio
```

Supported explicit engines are `web`, `godot`, `unity`, `unreal`, `python` and `wav`. Check the installed adapter's README for scene setup. For a source-only TypeScript installation in a web game use `node scripts/install-sfx.mjs plant-large-seeds --dest /absolute/path/to/game/src/audio`. The importer copies shared dependencies once and detects conflicting edits. Installed audio is a game-owned snapshot.

## 2. Sculpt and remix

Keep high-priority events intelligible above weather and motion beds. Use the recipe's native parameters for the action itself. Use macros for the listener's perspective, scale and room. Their exact schema is available at the root of [catalog.json](catalog.json).

| Control | Range | Meaning |
| --- | --- | --- |
| `punch` | 0–1 | Emphasize the attack |
| `size` | 0–1, neutral 0.5 | Weight in the low band |
| `distance` | 0–1 | Muffle and soften the direct signal, add a return |
| `space` | `dry`, `small_room`, `hallway`, `outdoor_open`, `canyon_echo`, `underwater` | Reflection timing and coloration. Existing `outdoor` and `cavern` presets also work |
| `wetness` | 0–1, default 0.5 | Level of treatment. Zero suppresses reflections and underwater coloring |
| `grit` | 0–1 | Blend in saturation |
| `speed` | 0.25–4× | Pace and duration |
| `pitchShift` | −24 to +24 semitones | Pitch independent of pace |

```sh
node scripts/remix.mjs plant-large-seeds --id greenhouse-seeds --params '{"force":0.3}' --space small_room --wetness 0.25 --format wav --dest /absolute/game/audio
```

For 2–4 layers, use a JSON design. Gains are linear. Offsets are seconds. Leave one audible layer at zero. The first layer supplies the mix and spectral brief. Each layer accepts its own `params` and `macros`. An all-loop stack with zero offsets stays loopable.

```json
{
  "id": "sowing-by-hand",
  "layers": [
    { "id": "plant-large-seeds", "params": { "force": 0.35 } },
    { "id": "grass-footstep", "gain": 0.14, "offsetSec": 0.12 }
  ],
  "macros": { "space": "outdoor_open", "wetness": 0.18 }
}
```

```sh
node scripts/remix.mjs --spec /absolute/path/design.json --format ts --extremes --dest /absolute/game/src/audio
```

The tool runs QA before publishing. Use `ts` for editable playback, `wav` for PCM or sample-accurate looping, `ogg` for Vorbis and `opus` for compact delivery. Both compressed formats require local FFmpeg. Read the JSON result for the file, checksum and errors. Editable recipes retain their credits. For exported audio preserve the manifest or the credits returned by the remix CLI.

## 3. Invent, verify and wire it in

Use the [cookbook](references/sound-design-cookbook.md) to start a genuinely new cue. Choose relevant recorded transients from the [source inventory](sources/recordings.json). Each recipe default-exports a `SoundRecipe`. Size the output to `ctx.frames`, use `ctx.sampleRate` and derive variation from the supplied seed. Return finite PCM samples. Test the actual file before adding it to the game.

```sh
npm run --silent qa -- --file /absolute/game/src/audio/recipes/sowing-by-hand.ts --both-levels --extremes
```

For a studio addition, create an isolated recipe under `recipes/`, add a `review` ticket with its collection, and run `npm run catalog`. A revised reviewed cue gets a higher ticket revision so the local desk asks for a fresh vote. The compact release checksum set is in [qa/release-masters.json](qa/release-masters.json).

For browser playback, import the installed recipe and reuse a player after the browser's first audio gesture. Fixed seeds reproduce a render. Calling `play()` cycles variants and adds small pitch and filter changes.

```ts
import seeds from './audio/recipes/plant-large-seeds.ts';
import { SfxPlayer } from './audio/engine/index.ts';

const planting = new SfxPlayer(audioContext, seeds, { level: 'balanced' });
planting.prime();
// In the game's successful-planting handler:
planting.play();
```

`SfxBedBlend` crossfades two weather loops. For event priority and vehicle roles, see [event audio](references/event-audio.md) and the [vehicle map](references/3d-audio-map.json).
