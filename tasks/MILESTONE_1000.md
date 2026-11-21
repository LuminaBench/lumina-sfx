# 1,000 sound recipes

This release adds 298 sounds to the 702-sound studio. Soundboard has search by name, material, category, and collection. It plays and exports the original or balanced profiles. Recorded and hybrid sounds show their source credits at the point of audition.

| Collection | Added | Design |
| --- | ---: | --- |
| Aviation | 36 | Airframe perspectives, engines under load, distant passes, sailplane wind, and contacts |
| Water | 36 | Rowboats, dinghies, boarding, paddles, arrivals, and waterline perspectives |
| Transit | 34 | Metro, rail coach, streetcar, regional rail, gates, and escalator rhythm |
| Motion | 32 | Road and workshop vehicles, mountain bikes, perspective transitions, and contact surfaces |
| Creator | 28 | Short visual entries, comparison swaps, split-view slides, and closing tails |
| Environment | 30 | Six biomes across daylight, shelter, rain, dusk, and foreground gusts |
| Props | 26 | Keyboards, printer Foley, bench tools, lids, and everyday fixtures |
| Sport | 26 | Court, ice, pool, and table contacts with different motion and stops |
| Movement | 24 | Weight transfer, edge steps, landing, and lift across six surfaces |
| Space | 26 | Original fictional hardware confirmations and power-loss cues |
| **Total** | **298** | |

The new collections are released for browsing. Earlier personal review decisions remain in the local studio. A fresh local clone creates its feedback file on the first vote.

## Verify a release

```sh
npm ci
npm run typecheck
npm run qa -- all --both-levels
npm run qa -- --collection "Sport · Contacts and feedback" --extremes --both-levels
npm run levels:audit
npm run build
```

The QA command checks both PCM encodings, sample-peak limits, relative onset timing, loop continuity, and one repeated render for deterministic output. The balanced profile has its own headroom check. Source URLs and licenses travel with each recording. For a real game mix, retain a separate gain bus and evaluate distance and concurrent playback.

The static build opens in Soundboard for audition and export. Run `npm run demo` for the local review workflow.
