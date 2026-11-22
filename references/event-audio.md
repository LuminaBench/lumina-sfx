# Event audio

Use the recipient game's event hooks to select and play a small set of cues. Start with **Balanced levels**, then judge the gain of each cue in the game's own mix.

| Game event | Starting cue | Playback |
| --- | --- | --- |
| Focus moves to a menu option | `menu-option-focus-microswitch` | Play once when focus changes. Use a low gain for rapid navigation. |
| Player selects an option | `menu-selection-firm-downclick` | Trigger on the accepted selection. |
| Player commits a choice | `menu-confirm-spring-detent` | Play when the action succeeds. |
| Player backs out | `menu-cancel-felt-stop` | Use a short release contour to distinguish it from confirm. |
| A hit is registered | `hitmarker-cloth-and-sharp-tick` | Keep quiet enough for repeated hits. |
| An elimination is credited | `arcade-kill-confirm-dry-ceramic-stamp` | Play one compact stamp, with priority over any hit cue from the same action. |
| A quieter elimination is credited | `stealth-takedown-quiet-wood-token` | Use the wood and cloth cue in quieter scenes. |
| A warning state begins | `radar-hard-lock-warning-dry-double-burst` | Play on entering the state. Give persistent warnings a repeat interval in the game logic and stop them when the state clears. |
| A launch occurs | `rocket-launch-whoosh` | Place the ignition and plume at the launch event. |
| A fast object passes the listener | `supersonic-missile-close-needle-whistle` | Play at the pass. Use the distant variant for less prominent flybys. |
| A pressure wave arrives | `close-supersonic-twin-pressure-crack` | Trigger separately from the pass. |
| An explosion occurs | `close-alley-explosion-concrete-debris` | Pick material and perspective, such as plate glass, earth, a metal bulkhead, or a distant tunnel. |
| Reload animation needs a close Foley cue | `carbine-prop-reload-quick-soft-polymer-seat` | Align the cue's contact to the animation marker. |

Use `flight-radar-acquiring`, `radar-hard-lock-warning-dry-double-burst` and `flight-radar-contact-lost` for electronic state changes. Reserve tactile console clicks for a player actually pressing a control.

## Collections

- **Feedback · Menu and interaction** and **Feedback · Elimination and combat** cover compact physical responses, hitmarkers, and distinct elimination stamps.
- **Alerts · Warnings from hardware** includes recorded appliance, factory, and detector sources. Pair warning audio with a visible status cue.
- **Flight · Launch and flyby** and **Flight · Supersonic and airframe** cover departures, close and far whistles, pressure fronts, and aircraft layers.
- **Destruction · Pressure and explosions**, **Combat audio · Reports by perspective**, and **Combat audio · Action and reloads** cover pressure, reflection, debris, and separate prop movements.
- **Vehicles · Load and close mechanisms** includes more engine load changes, braking, track movement, and collision Foley.

```sh
node scripts/search.mjs menu selection --json
node scripts/search.mjs elimination --category "Footsteps & UI"
node scripts/search.mjs --collection "Flight · Launch and flyby"
node scripts/search.mjs --collection "Combat audio · Action and reloads" --json
```
