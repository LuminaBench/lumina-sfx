# Flight, motion, and creator demos

The release adds 120 cues in ten collections of 12. Start with jet ignition, passenger jet passes, rotor and drone sounds, and freefall wind. Then listen to engine perspectives, cabin actions, rail, editorial transitions, camera Foley, device events, and atmosphere. Use [Quick Review](http://127.0.0.1:5173/#review) or open the [catalog](../catalog.json) for source credits.

## Production plan for the 1,000-sound release

The [1,000-sound release](MILESTONE_1000.md) completed this expansion. The planning allocation below records the coverage targets.

| Order | Family | Cues | Situations to build |
| --- | --- | ---: | --- |
| 1 | Aviation beyond the ramp | 36 | Seaplanes, gliders, hangar doors and ventilation, airport service props, baggage wheels, remote runway perspective, propeller cabin states, aircraft touchdown on gravel and water |
| 2 | Ocean, boats, and weather | 36 | Small outboard startup and idle, wakes by a hull, ferry ramp contacts, marina ropes, distant foghorns, sail changes, breakers, wetsuit and paddle Foley |
| 3 | City and transit | 34 | Tram interiors, metro acceleration, railway switches, station ventilation and gates, traffic under different cover, underground stairs, pedestrian crossings, bikeways |
| 4 | Road and workshop motion | 32 | Vintage car starts, off-road tires and suspension, bike ratchets, garage tools, road material transitions, rider perspective, articulated vehicle work, exterior-to-cabin matches |
| 5 | Creator and product demos | 28 | Walkthrough cue points, before-and-after swaps, split-screen reveals, pitch-safe title lengths, soft end cards, capture start/stop, camera close Foley, studio and interview beds |
| 6 | Biomes and weather | 30 | Exposed coastline, canyon gusts, branches in frost, underwater muffling, rain under different cover, alpine snow, meadow dawn and insect beds |
| 7 | Everyday machines and props | 26 | Keyboards, desks, lab gear, switches, printer cycles, drawer rails, recycling, appliances and handheld tools |
| 8 | Sports and playful physics | 26 | Ball bounces by surface, practice net, foam targets, tennis and table games, skating, ziplines, indoor pool Foley |
| 9 | Movement in unusual places | 24 | Rope and ladder movement, snowshoe and ice, water-edge walking, gear movement, jumps on different platforms, rolling and sliding props |
| 10 | Fictional space and games | 26 | Original launch stings, spacecraft cabin and docking cues, robots, short feedback motifs, shield and power transitions, original arcade interactions |
| | **Total** | **298** | The 702-sound studio plus these production slots reaches 1,000. |

Start with isolated aircraft and marine recordings, then add creator transitions and state-specific tech in parallel. For each pair, keep perspective or action differences audible. An interior motor, the exterior moving engine, and the transition between them are distinct events. Use alternate takes for the same event within one recipe. Use real, verified CC0 recordings for grounded mechanics, and original DSP for fictional UI, transitions, and unavailable layers.

## Level calibration

Quick Review and Soundboard have a **Balanced levels** switch. The original sound is the starting mode. Balance remembers the switch on that browser and applies the same profile to audition and WAV export. Balanced exports end in `-balanced.wav`.

For TypeScript games, pass `{ level: 'balanced' }` to `SfxPlayer` or `renderSound`. The engine matches short-window weighted energy within a mix role and sets sample-peak headroom. There are separate targets for ambience, detail, Foley, interface, voices, vehicles, and impacts. Gain is bounded, and headroom wins when a sound has a strong transient. This is an approximate cue-matching meter. Game mix buses still control depth, distance, and how multiple sounds add together.

Run `npm run --silent levels:audit` to compare role targets and peak limits. Audition neighbouring cues with the switch on and off, then test one real scene that layers ambience, a short cue, and a foreground action at the game's normal volume. Revisions to original recipe audio should return to Quick Review under a new revision.
