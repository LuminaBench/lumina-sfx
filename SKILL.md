---
name: lumina-sfx
description: Find, sculpt, layer, invent and verify offline game sound effects. Use for launch videos, keyboards, swipes, tactile menus, non-vocal alerts, mood-aware scene mixing, crossfades, timed audio chains, Web Audio and Three.js, Godot, Unity, Unreal, Pygame, WAV or Opus delivery, recorded Foley, weather, vehicles, impacts, farming, animals, reactive UI, and custom audio recipes.
---

# Lumina SFX

Run the studio commands from this skill's directory using Node.js 22.12+. Pass the absolute game path to `--project` or `--dest`. Core search, WAV rendering, selective install and QA work offline from the checkout. The game uses the assets or code you install. The user can keep their existing audio manager. When shipping runtime code, include its MIT notice. The sound license permits commercial project use without audio attribution and restricts competing library distribution. [License](LICENSE)

## 1. Search for the closest performance

Choose the audible event before choosing layers. For a concrete brief, use `node scripts/choose.mjs "settings tab" --isolated`. Give it one short phrase per requested sound. Keep controller bindings, narrative motivation and delivery instructions separate from the audible description. A `single-cue` result is ready to audition. A `review` result shows words the catalog could not substantiate. Inspect those or invent the missing performance. For a fixed environment use `--scene`; a saved arrangement qualifies only when its source layers cover the requested cues without extras. For live actions, keep their triggers independent.

Start with the game event, surface, perspective and foreground/background role. For everyday requests use `--intent "clicky switch settings tabs" --limit 3` to rank partial matches and synonyms. Optionally add `--exclude "arcade jingle"` to filter matching metadata words. Add `--designs` to find multi-layer JSON arrangements and pass the returned file to remix with `--spec`. Plain positional search requires all supplied words. Broaden the query if the first one returns nothing. Each catalog entry supplies an ID, duration, loop flag, tags, controls, and recording credits when relevant. Search also matches credited recording titles. For annotated cues, inspect `contains`, `perspective`, and `markers` to choose a specific moment in the performance.

```sh
node scripts/search.mjs seed planting --json
node scripts/search.mjs rain --loop --json
node scripts/search.mjs --collection "Farm · Harvest" --json
```

For a foreground game effect, search with `--isolated` first. That subset uses designed sounds, stationary textures measured from real motors, and tightly cropped impact attacks. If the isolated subset lacks the performance you need, try `--background-checked` to find field cues screened for speech and keyboard-like sounds across four seeds at three parameter settings. This filter matches the reviewed audio fingerprint and omits cues with an outstanding listening note. An unfiltered JSON search includes the cue’s `auditionNote` when relevant. Solo the actual export at game gain, especially after changing pitch, extending a tail, or looping a quiet passage. For other field recordings, audition the source for conversation, typing, traffic, and room sound before choosing it. Keep incidental sounds out of the asset and add ambience separately in the game. Pass `--isolated` through install, remix, or the listening desk to enforce this choice.

```sh
node scripts/search.mjs interceptor --isolated
node scripts/search.mjs moored hull --background-checked --json
node scripts/remix.mjs --spec references/scenes/dogfight-cockpit.json --isolated --format wav --dest /absolute/game/audio
```

For a close match, install only the required IDs. Playback helpers accept three-variant pools, positions, and live loop controls. The game still needs to call the helper on its actual success, collision, movement or state transition. Use one persistent player per repeating event where appropriate.

```sh
node scripts/install-sfx.mjs plant-large-seeds light-rain-loop --project /absolute/path/to/game
node scripts/install-sfx.mjs plant-large-seeds --engine wav --dest /absolute/path/to/game/audio
```

Supported explicit engines are `web`, `godot`, `unity`, `unreal`, `python` and `wav`. Check the installed adapter's README for scene setup. For a source-only TypeScript installation in a web game use `node scripts/install-sfx.mjs plant-large-seeds --dest /absolute/path/to/game/src/audio`. The importer copies shared dependencies once and detects conflicting edits. Installed audio is a game-owned snapshot.

## 2. Sculpt and remix

Try the closest complete performance on its own. Search results are alternatives. Add a layer only for a distinct requested action, missing timing cue or audible perspective. A wooden-floor step already includes the sole. Start a fireside thunderstorm with fire and thunder; give optional wind an explicit `under` level relative to the fire. For keyboard and pointer gestures, transition sync points, and measured background levels, see [launch audio](references/launch-audio.md).

Start a scene by identifying its foreground, listener position, background and emotional change. Use a `calm` or `dramatic` mood with an explicit layer role and native performance controls when appropriate. For a sustained handoff, join two layers with `afterLayer.crossfadeSec`. Tune pitched layers to a shared `tonicHz` only when their source pitches are known. Check the same seed and timing in both moods. [Scene intent, tuning and blind comparisons](references/scene-intent.md)

For settings tabs, focused controls, inventory drops and non-vocal game feedback, see [tactile menus and event hooks](references/menu-design.md). Use a short physical confirmation for local success. Give advisory and warning states distinct non-vocal rhythms. Keep high-priority events intelligible above weather and motion beds. Use the recipe's native parameters for the action itself. Use macros for the listener's perspective, scale and room. Their exact schema is available at the root of [catalog.json](catalog.json).

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

Fit a one-shot to an animation with `--fit-seconds 0.18`. For 2–4 layers, use a JSON design. A layer can use `fitSec` for a full retime, `durationSec` to crop or sustain a loop, and `afterLayer` to follow or overlap a named predecessor. Gains are linear. Offsets are seconds. Leave one audible layer at zero. The first layer supplies the mix and spectral brief. Each layer accepts its own `params` and `macros`. An all-loop stack with zero offsets and unbounded layers stays loopable. Use cue landmarks, gain envelopes, and a gradual filter change to join events. The scene guide includes nested JSON arrangements, ready-to-render designs, live event installers, and a blind listening desk. [Scene design](references/scene-design.md)

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

For interactive actions, trigger the movement from player input and the contact from the game event. Keep continuous loops running as speed, load or depth changes. Compare candidates with a shared background and ten seeded performances using `npm run audition`.

Use the [cookbook](references/sound-design-cookbook.md) to start a genuinely new cue. Choose relevant recorded transients from the [source inventory](sources/recordings.json). If an inventory entry has `supersededBy`, use that repaired recording for new layers. Each recipe default-exports a `SoundRecipe`. Size the output to `ctx.frames`, use `ctx.sampleRate` and derive variation from the supplied seed. Return finite PCM samples. Test the actual file before adding it to the game.

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
