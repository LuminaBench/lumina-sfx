# Sound for product films and screen recordings

Cut to the gesture the viewer sees. One key-down fits one appearing character. Use key-up for a visible release, a recorded-contact typing phrase for text arriving together, or repeat individual strokes at the timestamps in the edit. Keep a held key quiet between its press and release. Space, Return and modifier chords have their own performances.

| Edit | Starting point |
| --- | --- |
| A close shot of a real keyboard | Search for its mechanism and the action, such as `office membrane return`, `laptop scissor key down` or `click jacket typed word`. |
| A cursor lands or clicks | Pick the actual input, such as a mouse press, trackpad press or stylus release. One UI activation normally needs one contact. |
| The layout moves | Use a left or right swipe for travel, a whip for a fast cut or a page wipe for a longer handoff. The swipe direction describes the direction of the sound. |
| A title settles on a frame | Search a panel reveal, title rise or pull away. Align the `apex` marker to the frame. Audition under dialogue or music at delivery volume. |

```sh
node scripts/search.mjs --isolated --collection "Launch video" --intent "quiet laptop keyboard key down" --limit 3
node scripts/search.mjs --isolated --intent "silk swipe left" --limit 2
node scripts/remix.mjs silk-panel-reveal --id title-arrives --fit-seconds 0.32 --isolated --format wav --dest /absolute/edit/audio
```

## Decide what belongs in the mix

Solo the closest complete performance first. For an indoor wooden step, try `indoor-hardwood-shoe-step` or `hardwood-footstep`. The heel and sole already belong to one step. For a walk, time several takes to the visible feet. A creaky old house can warrant `indoor-floorboard-brief-flex` on a particular weight shift. A normal floor needs no extra cue.

For a fire in a thunderstorm, start with close crackle and one distant roll. The [two-layer design](scenes/fireside-distant-thunder.json) is ready to render. Add wind if it is an audible part of the brief. Place it after the named fire in the layer list, and start it well below the fire:

```json
{ "id": "slow-wind-gusts-loop", "role": "bed", "durationSec": 10, "params": { "swell": 0.2 },
  "under": { "layer": "fire", "byDb": 16 } }
```

When a loop tagged wind or breeze is explicitly assigned the bed role after a foreground marked `focus`, the mixer defaults to 16 dB below that first focus. An explicit gain or `under` overrides that default. Wind can still be the foreground when the scene calls for it.

`under` caps the stem's measured active level relative to an earlier named layer (or its one-based index). The renderer measures the selected take after gain, filters, fades and envelopes. It applies one downward trim across the whole stem, preserving its dynamics and stereo image. Already quiet stems keep their authored gain. This is a relationship across the cue; use an envelope for a specific gust timed to a picture cut. If the additional bed obscures either subject even at low gain, leave it out.

## Pick and audition at the speed of the edit

```sh
node scripts/choose.mjs "thocky mechanical keyboard click" --isolated
node scripts/choose.mjs "silk swipe left" "settings tab" --isolated
node scripts/choose.mjs "fire crackle" "distant thunder" --scene
```

Each quoted phrase describes one audible requirement. In a fixed scene, the selector first looks for a single performance whose `contains` metadata covers every requested component. For example `"heel" "sole" --scene --isolated` selects one indoor step. Put material and direction in the same phrase as the gesture. A keyboard playing under narration still needs a keyboard cue; use gain and filtering to place it under the voice. The selector checks wording against catalog metadata. Its result is a shortlist decision, and an unmatched word is a reason to inspect the candidate.

For a single tab change, compare the chosen cue solo and at the fastest repeat rate players can trigger. Keep one contact per state change. For a shot with both camera movement and a control seating, audition the contact alone first, then compare the version with the swipe at matched foreground level. Keep the second layer if it makes the movement or seating clearer. Align the swipe apex and contact marker to picture. Saved scenes have authored timing; independent game events still need independent triggers.
