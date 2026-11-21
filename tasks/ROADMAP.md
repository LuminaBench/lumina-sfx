# Lumina SFX library roadmap

The target is 1,000 playable, searchable recipes. The 83-recipe baseline accounts for the original library. The 917 additional slots below are budgets for distinct actions, materials, or game states. Alternate takes of the same cue belong in its recipe.

| Library family | Additional cues | Game situations to cover |
| --- | ---: | --- |
| Wakefall crops and tools | 100 | Seed packet and scatter, large seeds, dibber, dry and damp beds, plant plugs, compost, first water, irrigation, row shears, fruit and berry picking, root pulls, sheaves, husking, pruning, raking, stake repair |
| Livestock and animal care | 65 | Turkey, goose, donkey, young birds, grazing, feed scatter, feeders, trough fills, bedding, hoof weight, barn timber, paddock gates, wool shear, fence bells, egg handling, fledglings, close and yard-sized calls |
| Farm habitats and wildlife | 65 | Dawn pasture, open coop, idle stable, beehive, orchard canopy, frogs, songbird perches, insects at dusk, hedgerow, nearby pond, irrigation channel, different seasons and times of day |
| Homestead production | 70 | Hand mill, flour sifting, cheese press, butter churn, preserves and jar seal, mixing and boiling, saw bench, loom, forge, pottery wheel, spinning, bagging, wagon loads, market stalls |
| Weather, water, and fire | 65 | Gutters and runoff, under roofs, passing showers, hail surfaces, wind through reeds or gaps, winter squalls, distant thunder, different shorelines, creek flow, low fires, hearth draft, extinguishes |
| Road vehicles and engines | 95 | Sedan, tractor, truck, motorcycle, van, bus and EV, keyed and push-button starts, idles, pullaway, load, gearbox states, cabin versus curb, wet roads, gravel, impacts, braking, reversing |
| Other transport | 45 | Train doors, platform arrival, wagon wheels, cart suspension, boat motor and sail, harbor lines, winch, elevator, light aircraft, airship, freight and factory lifts |
| Movement and surfaces | 50 | Footfalls on snow, boards, tile, mud, rubble, gravel and water, run, stop, pivot, jumps and landings, ladders, cloth, backpack movement, different weight classes |
| Props, materials, and world Foley | 60 | Handles and locks, drawers and chests, cabinets, keys and tools, light switches, corks, paper, bags, lids, wooden and glass breaks, chain and rope, furniture placement |
| Game combat and destruction | 65 | Stylized reports and equipment actions, near and distant game-audio perspectives, interior and exterior reflections, fantasy impact materials, arcade blasts, arcade vehicle explosions, distinct debris and ricochets |
| Sci-fi equipment and devices | 58 | Energy and laser cues, blade states, shield response, charging, deploy and retract, doors and locks, drones, scanners, warning systems, tactile mechanisms, environmental machines |
| Interface and game states | 54 | Focus, select, confirm, blocked inputs, inventory, crafting, trade, navigation, journal, quickbar, rewards, timers, reconnect, accessibility-friendly warnings |
| Fantasy actions | 60 | Rune triggers, wards, portals, magic tools, elemental casts, magical agriculture, transformation, healing, enchantment, environmental interactions and pickups |
| Places and scene layers | 65 | Workshop, market, tavern, ruins, village outskirts, mining, docks, industrial yards, sterile interiors, wilderness, underground spaces, transitions between locations |
| Total new slots | **917** | With the baseline, **1,000 recipes** |

## First expansion

Wakefall starts with seed handling, soil work, water, harvests, tools, livestock contacts, additional calls, and farm habitat loops. Tractor ignition, idle, and pullaway sit with the other vehicle sounds. The same release adds movement, props, UI, original game combat, sci-fi and fantasy effects. The [queue](queue.json) contains individual titles and listening criteria and is the implementation ledger. Existing higher-revision tickets take priority, then collections follow queue order.

## How a cue enters Quick Review

1. Give each cue a job in a game scene and a cue-specific sound to listen for. Compare it with related approved cues and ensure that the sound provides a distinct event or perspective.
2. Use real, isolated CC0 or public-domain recordings wherever they improve recognition. Verify the specific asset page and its uploader provenance, keep credit metadata with the recipe, and retain useful natural variations as takes. Use original DSP for fictional effects, UI, and scenes with no suitable defined source.
3. Ask Gemini 4 Neon through Antigravity to help with planning and edit critique. Use the actual user votes for taste decisions. The agent can offer editorial guidance from references and audio measurements.
4. Run seeded WAV QA at defaults and both parameter endpoints, check that loop boundaries hold, and review the attack and tail. Build the catalog and add the cues in small related collections.
5. Use one-card Quick Review and keep the vote attached to the version heard. Use approvals as references for the next batch. Re-cut rejected cues and bump their revisions before returning them to the queue.

The [Wakefall-first run](NEXT_RUN.md) added 250 sounds, starting with wet harvests and farm processing before stable chores, seasonal field backgrounds, and the other production families.

The [flight, motion, and creator release](DEMO_EXPANSION.md) broadens the library for games, product demos, and video edits. Its 298 remaining slots give a release order for reaching 1,000 from the current 702 sounds.
