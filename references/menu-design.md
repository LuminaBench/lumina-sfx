# Tactile game menus

Use a quiet sound while the player explores, a firmer sound when something seats, and a short release when leaving a screen. The ten recipes in the Tactile menus collection combine isolated CC0 switch or latch attacks with designed material resonances. Their pressure control changes the contact and their named markers identify the important moment. All ten are instrumental Foley.

| Player action | Cue | Trigger in the game |
| --- | --- | --- |
| Focus moves | settings-focus-felt-tick | When focus changes to a different item. Coalesce changes during rapid scrolling. |
| Settings tab opens | settings-tab-walnut-detent | Once when the active tab changes. Pointer-up and focus-change can describe the same action. |
| Subtab opens | settings-subtab-porcelain-tip | One precise contact on the inner navigation level. |
| Back to parent | settings-back-suede-release | On a successful return, with a soft tail. |
| Toggle on | settings-toggle-engage-brass | When the setting actually becomes enabled. |
| Toggle off | settings-toggle-off-cork | When the setting becomes disabled. Its lower seat distinguishes it in mono. |
| Slider steps | settings-slider-knurled-index | Once per discrete index crossing. Skip intermediate crossings in a fast drag. |
| End of list | settings-list-edge-felt-bumper | Once on first pushing against the edge. Reset when the user releases or changes direction. |
| Inventory drop | inventory-magnet-seat | The slot accepts the object. Sync the seat marker to the snap animation. |
| Apply changes | settings-apply-overcentre-latch | Commit succeeds. Suppress a second click from the generic button handler. |

## Fit the interaction

Find several recorded or designed options first. For an existing sequence use the editable design index. A design search returns a JSON file for the remix CLI. Recipe search returns IDs for install or remix.

```sh
node scripts/search.mjs --intent "clicky switch settings tabs" --isolated --limit 3
node scripts/search.mjs --designs --intent "settings tabs toggle apply" --limit 1 --json
node scripts/remix.mjs settings-tab-walnut-detent --fit-seconds 0.19 --id settings-tab-slow --format wav --dest /absolute/game/audio
node scripts/remix.mjs --spec references/scenes/settings-panel-apply.json --isolated --format wav --extremes --dest /absolute/game/audio
```

Choose the operation to suit the animation:

- **Fit the entire performance** with layer `fitSec` or CLI `--fit-seconds`. This sets pace while retaining the pitch setting and accounting for the layer's room tail. Stretch ranges from one quarter to four times the base pace. A longer game action often benefits from a quick original attack, a separate sustain, and a distinct release.
- **Keep the attack and shorten the tail** with layer `durationSec`. The renderer fades the cut edge. Select a later starting point with `fromMarker`.
- **Extend a continuous texture** by giving a loopable layer a `durationSec` equal to the hold length. For a player-controlled hold, keep the loop playing while the input is down and trigger release on input-up.
- **Keep joins aligned when editing** by giving earlier layers a unique `label`. Use `afterLayer: {"layer":"tab","shiftSec":-0.012}` for a 12 ms overlap, or `atMarker: {"layer":"apply","name":"commit"}` to attach a detail to a physical contact. Labels belong to their group. Nested markers can be addressed as `apply.commit`. Envelopes and shifts use seconds after layer fitting. A group-level speed macro subsequently changes the entire timeline.
- **Keep the preview and gameplay distinct.** The printed settings scene demonstrates pacing. A live menu should trigger each cue from the actual accepted UI state. Keep focus quiet at delivery gain and compare in mono over game ambience and music. Use the listening desk to compare across seeds.

## Next production batches

1. Compare the tab landing, return and apply cues in real controller traversal. Record whether listeners can distinguish them without seeing the selection.
2. Extend the strongest family into hold-to-commit, early release, undo and invalid drop. Prototype a muted desk treatment and a crisp instrument-panel treatment before expanding either.
3. Exercise warning onset, acknowledgement and clear using non-vocal rhythms. Give HUD feedback and world impacts independent event IDs so an unconfirmed action produces no reward.
