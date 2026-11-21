# Vehicle and combat audio

This release adds 108 cues across eight Soundboard collections. Recorded engines, hull movement, and machinery have linked source credits in the catalog. The armored vehicle and fictional combat scenes use original DSP and, where credited, recorded machinery or prop Foley.

| Collection | Cues | Coverage |
| --- | ---: | --- |
| Powertrain · Road engines | 14 | Compact petrol, diesel V6 perspectives, straight-six turbo, heavy-duty truck, and EV inverter |
| Utility · Motorcycles and plant | 14 | Ducati twin, Yamaha two-stroke, Honda trail bike, moped, forklift, crane hydraulics, and chain guide |
| Maritime · Motors and deck | 17 | Outboard, riverboat, personal watercraft, offshore motorboat, sailboat cabin, mooring, and hull dressing |
| Aviation · Flight and ground detail | 15 | Cessna taxi, passenger turboprop, jet and helicopter beds, turbine rundown, and canopy and headset details |
| Tracked · Movement and hull | 12 | Steel track, gravel, mud, deck, pivot, suspension bleed, and interior hull movement |
| Combat audio · Arcade reports | 12 | Compact, heavy, pneumatic, and pulse reports with separate indoor and outdoor perspectives |
| Combat audio · Mechanisms and gear | 12 | Prop latches and inserts, clockwork, and light and heavy plate Foley |
| Combat audio · Surfaces and energy | 12 | Surface hits, brass prop landings, shield intensity, and capacitor charge, discharge, and fizzle |

## Pair cues in a game

- Start with `compact-petrol-crossover-key-start` and hand off to `compact-petrol-crossover-steady-idle-loop`. Both use the same field recording.
- For a tracked vehicle, layer one of the crawler loops for the current surface. Use `armored-crawler-slow-pivot-on-stone` and `armored-crawler-brakes-and-hull-settles` for short movement events.
- Use `working-motorboat-steady-offshore-loop` for the motor bed and `planing-hull-bow-slap-to-spray` when the boat picks up speed. Add `marina-mooring-line-strains-and-relaxes` at the dock.
- Drive an energy weapon interaction with `prism-repeater-capacitor-charge-loop`, then play `prism-repeater-clear-energy-discharge` or `prism-repeater-depleted-fizzle` on release.

Use the `balanced` level profile for a consistent audition baseline. Use the game mixer to set the level of continuous vehicle beds against nearby controls and other foreground sounds.

```sh
npm run search -- tank deck --loop
npm run search -- --collection "Aviation · Flight and ground detail" --json
npm run --silent qa -- --collection "Maritime · Motors and deck" --extremes --both-levels
```
