# Match the scene to the player's experience

Choose what the player must recognize first, the listener's position, the supporting bed, and the moment that changes the scene. A resting player on a beach might hear individual twigs breaking with thunder far offshore. A storm encounter on the same beach can bring the thunder forward while keeping the fire recognizable. Keep the same clock when the game animation or a UI event owns the timing.

## Find and render a starting point

```sh
node scripts/search.mjs --designs --intent "relaxing beach campfire in rain" --limit 2 --json
node scripts/remix.mjs --spec references/scenes/beach-fire-weather-front.json --mood calm --format wav --extremes --dest /absolute/game/audio/calm
node scripts/remix.mjs --spec references/scenes/beach-fire-weather-front.json --mood dramatic --format wav --extremes --dest /absolute/game/audio/dramatic
```

Intent search returns a subject match and, for recognized mood words, a `suggestedMood`. Choose the mix from the request and the game state. When the player moves from calm to danger, design both states and trigger the handoff from the game. A single inferred label cannot describe every beat in a sequence.

## Direct the performance

Use `mood` for the emotional brief and `style` for the production style. The default mood is `neutral`. A CLI mood overrides the root design and is embedded in editable exports. A nested design keeps its own authored mood. Its parent treats the whole group as one layer.

| Layer role | Calm | Dramatic |
| --- | --- | --- |
| `focus` | Keep the subject present and round off the brightest detail | Give its attack more definition |
| `bed` | Keep the continuous environment audible and soft | Set it behind the foreground so events have room |
| `accent` | Pull short events back and soften their top end | Bring events forward and give their attacks more weight |

In the catalog, each mood and role lists its relative linear gain and low-pass cutoff in Hz. A cutoff of zero bypasses the filter.

Mark a layer's `role` when the story differs from its default. An ordinary loop defaults to bed, an impact to accent, and most other one-shots to focus. A fire loop beside the listener can be the focus. Use `paramsByMood` to change what the subject actually does. For example, the beach template changes the fire's spark activity and the thunder's native distance. Base `params` apply first, then the selected mood's named values. Explicit punch controls take precedence over the dramatic transient treatment. Normal mastering still applies after the layers are mixed.

For a measured level gap between a supporting layer and a foreground sound, use the [two-layer fire example and relative-level control](launch-audio.md).

## Join textures and preserve physical contacts

Use a linked crossfade when one sustained texture takes over from another. Label the first layer, give a loop a finite `durationSec`, and attach the second using `"afterLayer": {"layer":"shore","crossfadeSec":1.6}`. The second layer starts before the first ends. The two gain curves are linked with an equal-power taper. Start with several hundred milliseconds for rain or motors and adjust by ear. For copies of the same recording, listen for a level swell or phase cancellation in mono. An ordinary cut or a hand-shaped envelope may work better there.

For a footfall, switch or impact, keep the first attack intact. Anchor the next component to its named contact marker, then shape only its ringing or reflected tail. Use a positive `shiftSec` to leave a gap, a negative shift for a plain overlay, or `crossfadeSec` for a linked handoff. Crossfades must fit both layers. An outgoing layer can hand off once, and its incoming and outgoing fades must fit its duration.

## Tune pitched details selectively

For a UI chime, motor hum or other sustained tone with a **known** fundamental, set the design's `tonicHz` and the layer's `tune`. With `"tonicHz":220` and `"tune":{"sourceHz":440,"intervalSemitones":7}`, a 440 Hz source becomes approximately 329.63 Hz, a fifth above the shared reference. The event retains its duration. Omit the interval for a unison. The runtime supports a shift of up to two octaves in either direction and validates the source frequency. Supply the actual source fundamental before any layer pitch macro. Treat pitch matching as opt-in. Texture, perspective, timing and decay do most of the work for gravel, surf and fire. For an unknown pitch, audition first.

## Verify in context

```sh
npm run audition -- references/scenes/beach-fire-weather-front.json --moods --out /absolute/review/beach.html
```

Run `npm run test:scenes` after changing the mixer, timing or intent vocabulary. The blind desk compares neutral, calm and dramatic at matched active levels over the same ten seeds. Check that the intended subject survives in mono, the handoff reads as one change, and an alert remains distinct when other sounds are busy. Compare the editable export with the delivered WAV when a game requires sample-accurate events.
