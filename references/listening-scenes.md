# Mixing from a listener's perspective

A listening scene places sounds in metres and gives the mix a subject. Source audio, position and emphasis are independently editable. Use one source when one performance already contains the requested event. Keep UI clicks attached to the listener unless they come from a physical control in the world.

## From a sentence to a mix

1. Name the viewpoint, the sounds the listener should recognise and any intentional interruption. Use an empty subject list for an even ambience, multiple subjects for shared focus, or a timed moment to hand focus to another source.
2. Use one search phrase per audible event. Include the material/action in `query` and preferred recording characteristics in `prefer`. The agent interprets the sentence. The resolver searches the local catalog and returns a review result when the requested terms cannot be matched. Inspect any embedded sounds before adding support.
3. Save the returned `design`, inspect it, and render. Report the foreground, distance, competing sources, most crowded time and any gain lock that prevents the requested balance. Audition the complete result and its mono fold. The measured margin is a starting point for judgement.

```sh
node scripts/choose.mjs --brief references/listening-scenes/pilot.brief.json
node scripts/remix.mjs --spec references/listening-scenes/cockpit-engine.json --format wav --dest ./mix --report ./mix/report.json --stems ./mix/stems
node scripts/remix.mjs --spec references/listening-scenes/orbit-and-turn.json --dest ./game/src/audio --format ts
npm run scene:install -- references/listening-scenes/orbit-and-turn.json --dest ./game/public/audio
```

For a revision, save a new scene ID and render to a new output path. A game-owned file with different bytes is protected. Scene-wide sound-design macros and style apply to each source before placement, with per-layer overrides. This keeps the dry-stem and fixed-WAV event clocks consistent. Keep labels and the render seed stable to preserve each source take. A fixed clip is one emitter. Ask for separate stems when the game needs the listener to move between objects.

## Scene fields

| Field | Behaviour |
| --- | --- |
| `schemaVersion: 2`, `id`, `layers` | Up to 32 simultaneous named layers and 120 seconds. Use an explicit layer label for repeated IDs. Scene renders cap total source frames to bound memory. |
| `viewpoint`, `listener` | Describe whose ears the mix serves. Pose uses `position: [x,y,z]`, metres, +X right, +Y up, −Z forward. Positive yaw turns right, pitch up, roll tips the right ear up. Angles use degrees. |
| `path` | Add time-ordered poses with `at` in seconds on the common scene clock. The initial pose is at zero. Source and listener may both move. Positive yaw follows the shortest turn between keys. |
| `output` | `stereo` gives speaker pan and distance, `headphones` adds measured binaural direction, `mono` folds the speaker mix. Layer timing stays sample-aligned. |
| `placement.kind` | `point` localises an object, `cone` adds facing, `area` retains a broad stereo field, `listener` follows the listener and preserves the recording. Omitted placement is listener-relative. |
| `refDistance`, `rolloff`, `air`, `spread` | Full level within the reference radius. Higher rolloff reduces distant level. Air adds distance-dependent HF loss. Spread ranges from a localised mono point at 0 to the native stereo bed at 1. |
| `innerAngle`, `outerAngle`, `outerGain` | Cone full angles and outside amplitude. Aim the source using its pose. |
| `doppler`, `obstruction`, `room` | Optional radial-velocity pitch, obstruction from 0–1 or timed pairs, and early room reflections (`small_room` or `hangar`). Obstruction can follow an opening and closing door. Game code supplies the value. |
| `focus.subjects`, `marginDb` | Subjects are layer labels. The mixer matches overlapping shared subjects by trimming louder ones. It measures the foreground against the summed stereo background at the listener, then applies a steady background trim per section. Default aim is 8 dB. |
| `focus.moments` | Non-overlapping `{from,to,subjects,marginDb?}` sections. For a thunderclap that briefly wins, name thunder during the strike and let the base focus resume afterward. Transitions ease within 100 ms. |
| `gain`, `locked` | Gain is a linear multiplier. Lock a layer to protect its authored gain from automatic focus trimming. The final linked ceiling can attenuate the whole mix. |
| `maskEq` | A small, steady cut in a competing layer. For a low-mid engine hidden by thunder, audition `{"hz":350,"cutDb":3,"q":0.9}` on the thunder. Check the combined and phone-band margins before changing the whole bed. |
| Timing and edits | Use existing `offsetSec`, `durationSec`, `envelope`, `fitSec`, `atMarker` and `afterLayer` controls. Relative anchors still address an earlier layer. The scene clock preserves an intentional silent opening. |

The report gives planned steady margins, actual delivered margins across transitions, mono phone-band margins and the weakest overlap time. Figures use the fifth percentile of active 50 ms windows, with windows gated relative to the subject. Isolated peaks can fall below that margin. Locked beds can make it unattainable. Inspect the audible result before increasing the target.

## Playback and handoff

For a fixed scene, use the delivered WAV. Apply spatialisation once. A positioned stereo mix already contains the authored camera movement. For an interactive scene, use the dry files and pose, gain and timing data in the manifest. The solo files in a review pack include each layer's spatialisation and focus automation. Place them at their manifest offsets to audition.

After scene installation, copy the two TypeScript player files into your game source if your bundler treats the public folder as static. Deploy the manifest and WAVs together. Run preload during level loading. Resume the AudioContext on a user gesture.

```ts
import { ListeningPlayer } from './audio/orbit-and-turn/live-listening.ts';

const context = new AudioContext();
const url = new URL('/audio/orbit-and-turn/scene.json', location.origin);
const player = await ListeningPlayer.preload(context, url);
playButton.onclick = async () => {
  await context.resume();
  player.play();
};
// During gameplay, this player's poses drive the shared Web Audio listener.
player.setListener({ position: [0, 0, 0], yaw: 90 });
```

Call `setPlacement(label, pose)` on an active emitter and `stop()` to end playback. Equal-power speaker pan and native HRTF are selectable via the scene output. Browser and offline headphone filters have different timbres. Live focus automation follows the authored mix. Re-render the policy for a substantially different perspective, or drive the game's bus gains explicitly.

| Delivery | Direction and distance |
| --- | --- |
| Web / Three.js | Live panners, head turns, relative motion, spread and area width. The scene owns the Web Audio listener while it runs. Use one listener owner per context. |
| Fixed WAV in any engine | Full listener/source movement, speaker or mono render, or headphone export with the bundled SADIE II human-head measurements. Include the measurement license when distributing the table. |
| Godot 4 | Play dry sources with AudioStreamPlayer3D and a native listener. The manifest already uses Godot axes and metres. Use the helper's scene_pose for facing. Use a 2D player for listener-relative UI. |
| Unity | Map XYZ with FromSceneVector, set ConfigureSceneVoice and schedule a dry AudioSource per object. Multiply authored level by SceneConeGain for a directional speaker. A native spatialiser plug-in determines live headphone response. |
| Unreal | FromSceneMetres maps to centimetres. FromSceneFacing maps angles. Use separate Audio Components and the scene offsets. Choose native attenuation/cone settings or the project's spatialisation plug-in. |
| Pygame | The helper applies stereo pan, listener yaw and distance. Use a binaural WAV for a fixed headphone scene. |

Native engines retain their own rolloff curves and game event scheduling. The ready-made manifest player is for Web Audio. For native integration, apply the manifest's restore gain and region gains to dry files, or play the fixed export directly.

## Examples to audition

- **Engine or weather first.** Compare [engine](listening-scenes/cockpit-engine.json) and [weather](listening-scenes/cockpit-weather.json). They use identical sources, timing and seed. [The handoff](listening-scenes/thunder-handoff.json) gives thunder a short foreground moment.
- **Different ears in the same setting.** Compare [inside the canopy](listening-scenes/pilot-inside-canopy.json) with [the beach](listening-scenes/beach-under-flightpath.json). These also change the chosen recordings.
- **Orbit and turn.** The [turbine](listening-scenes/orbit-and-turn.json) travels around and above the listener, then holds its world position as the listener turns. Two menu ticks stay with the listener.
- **One-line edit.** Compare [fire beside wind](listening-scenes/fire-on-beach.json) with [quieter wind](listening-scenes/fire-quieter-wind.json). All crackles stay in place. [The hangar door](listening-scenes/hangar-door.json) reversibly changes the rain's brightness and early reflections on the same clock.

If a distant subject disappears, solo it and check for a recording that already sounds far away. Adjust the competing beds first. If a wide source becomes thin in mono, inspect the source's native stereo fold and narrow its spread or choose a more mono-compatible recording. For moving assets with baked-in pitch changes, leave additional Doppler off.
