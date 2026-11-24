# Footsteps in motion

Choose the surface under the planted foot. A single strike already contains its sole movement. On hardwood, use the contact on its own unless the scene calls for a loose board. Grass is mastered 9 dB below hardwood so a change of surface is audible at game gain.

| Surface | Recipe | Recorded contacts |
| --- | --- | ---: |
| Indoor wood floor | `stride-hardwood` | 12 |
| Concrete or pavement | `stride-concrete` | 10 |
| Loose gravel | `stride-gravel` | 8 |
| Grass | `stride-grass` | 8 |
| Shallow standing water | `stride-puddle` | 9 |

### One step or a finished walk

Run from the skill directory. The CLI prints the sample frame, side, take, pan and gain of every event, plus the recording credits. Reuse a seed for repeatable edits. Give a revised WAV its own filename.

```sh
npm run --silent footsteps -- --surface concrete --foot right --steps 1 --out /path/to/step.wav
npm run --silent footsteps -- --surface hardwood --steps 8 --gait walk --seed 72 --out /path/to/walk.wav
npm run --silent footsteps -- --route /path/to/walk.json --seed 72 --out /path/to/crossing.wav
```

A route is a JSON array. This walker crosses in front of a listener at the origin, switches ground, then plants to turn. Coordinates are metres in the ground plane. At yaw zero the listener faces −Z and +X is right. Yaw is in radians. Omitting positions gives a narrow first-person image.

```json
[
  {"surface":"gravel","steps":5,"gait":"walk","from":{"x":-3,"z":-1.7},"to":{"x":-0.5,"z":-1.7}},
  {"surface":"concrete","steps":4,"wetness":0.65,"from":{"x":0.2,"z":-1.7},"to":{"x":2,"z":-1.7}},
  {"surface":"concrete","steps":1,"motion":"pivot","travel":"left","from":{"x":2,"z":-1.7},"to":{"x":2,"z":-1.7}}
]
```

Use `gait` (`sneak`, `walk`, `sprint`) for pace and effort, `footwear` (`shoe`, `boot`) for sole firmness, `weight` and `wetness` (0–1) for load and surface dampness. Shoe and boot shape the recorded performance. A puddle has its own recorded splashes. For local footwork use `travel` (`forward`, `backward`, `left`, `right`) and `motion` (`steady`, `push-off`, `brake`, `pivot`). A route eases into the first step and settles on the last. Use `motion: "steady"` for a passage already in motion. Set `firstFoot` on a segment only to override the existing alternation.

### Live game with animation markers

Install the surfaces the character uses. One player per character owns its foot history. Give each actor a distinct seed if the game needs deterministic replays.

```sh
node scripts/install-sfx.mjs stride-hardwood stride-grass --dest /path/to/game/src/audio
```

```ts
import { FootstepPlayer } from './audio/engine/footsteps.ts';
import wood from './audio/recipes/stride-hardwood.ts';
import grass from './audio/recipes/stride-grass.ts';

const steps = new FootstepPlayer(audioContext, {output: foleyBus, seed: 72});

// Inside the animation's ground-contact handler. The game supplies these values.
steps.plant(surface === 'grass' ? grass : wood, {
  foot: marker.foot, eventId: marker.uniqueOccurrence, grounded: character.grounded,
  actor: character.groundPose, listener: camera.groundPose, gait: 'walk'
});
```

Both poses use world `{x, z, yaw}`. If the animation exposes the exact planted sole, pass its world `{x, z}` as `contactPosition` for placement. Omitting `foot` alternates automatically across surfaces. Pass a unique occurrence ID per contact, including its animation cycle, to suppress duplicate callbacks. Airborne events leave the next foot and take history intact. Use the optional third argument to schedule at an audio-context time. The browser's gesture policy still applies.

### Native engines

Export the requested profile once, then import its mono WAVs into the game's positional mixer.

```sh
npm run --silent footsteps -- --surface gravel --gait sprint --footwear boot --bank /path/to/game/audio/gravel-sprint
```

`footsteps.json` lists the takes assigned to each foot and their credits. On a marker, draw from that foot's shuffled pool, exhausting it before refilling and avoiding an immediate repeat. Use the engine's own positioning for the actor. The WAVs carry the selected gait and footwear profile.
