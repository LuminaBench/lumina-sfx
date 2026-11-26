# Sound for product films and screen recordings

Cut to the gesture the viewer sees. One key-down fits one appearing character. Use key-up for a visible release, a recorded-contact typing phrase for text arriving together, or repeat individual strokes at the timestamps in the edit. Keep a held key quiet between its press and release. Space, Return and modifier chords have their own performances.

| Edit | Starting point |
| --- | --- |
| A close shot of a real keyboard | Search for its mechanism and the action, such as `office membrane return`, `laptop scissor key down` or `click jacket typed word`. |
| A cursor lands or clicks | Pick the actual input, such as a mouse press, trackpad press or stylus release. One UI activation normally needs one contact. |
| The layout moves | Use a left or right swipe for travel, a whip for a fast cut or a page wipe for a longer handoff. The swipe direction describes the direction of the sound. |
| A title settles on a frame | Ask for “title card lands”. Align the `settle` marker to the landing frame. Use a title rise for upward motion, or a logo close for an end card. Audition under dialogue or music at delivery volume. |

```sh
node scripts/search.mjs --isolated --collection "Launch video" --intent "quiet laptop keyboard key down" --limit 3
node scripts/search.mjs --isolated --intent "silk swipe left" --limit 2
node scripts/remix.mjs silk-panel-reveal --id title-arrives --fit-seconds 0.32 --isolated --format wav --dest /absolute/edit/audio
```

An energetic cut calls for a faster pass. A portal opening on camera calls for the sound of the portal. When the brief only names the medium, inspect the picture or ask what moves. The edit can stay quiet while text is being read.

| Picture cue | Listen for |
| --- | --- |
| Focus, then a tab change | A light tick on each actual focus change. The tab gets a firmer contact. Check three changes in quick succession for fatigue. |
| Apply or save | One seated click timed to acceptance. A pitched notification belongs with an arriving message or an explicit request for that color. |
| Typing, a panel slide, then a title | Type a short word, leave room, move across the frame, land once. The [three-cue product trailer](scenes/product-trailer-interface-edit.json) has independent levels and sync points. |

A listening vote applies to the take as heard. With `search.mjs --intent ... --votes votes.json --json`, check `review.currentRevision`. A remaster needs a new listen. Compare the alternatives for the same visible action over the actual edit at delivery volume.

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

## Keep an interface consistent

Use `--palette soft` for felt, wood and damped contacts, or `--palette crisp` for glass, porcelain and brighter switches. A project can save its choice and its blind listening votes in a small JSON file.

```json
{"palette":"soft","useCase":"settings","votes":"settings-votes.json"}
```

The votes path is relative to the profile. Omit it until you have votes. Use `scripts/choose.mjs --profile /path/to/project-audio.json "drag handle grabs"` or pass the same profile to search. Create votes with `npm run audition -- settings-tab-walnut-detent settings-subtab-porcelain-tip --clean --use-case settings --out /tmp/settings.html`. Votes apply to that use and recipe revision. A brief can override the project palette.

Use one accepted input event for a timeline tick. Pair grab with release, and choose a snap only when the object actually seats. `silence` skips an uneventful gesture. `review` carries the words that still need a performance. For a version 2 scene, run `npm run compare -- /path/to/scene.json --omit wind --clean --out /tmp/without-wind.html` to hear whether the named support layer improves the mix. The level-matched blind desk compares both renders.

Intent search groups close takes that were checked in listening pairs. Pass `--all-takes` when choosing round-robin variants. Left and right swipes remain available independently. Field ambience can surface when its incidental birds or insects are requested. The clean source policy continues to require isolated inputs.
