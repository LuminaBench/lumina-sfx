# Lumina SFX Studio

An Agent Skill and TypeScript sound effects engine for games and web apps. The initial library has 25 original procedural recipes. Browser preview and offline WAV rendering use the same seeded PCM pipeline.

## Run the studio

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run demo
```

Open [the local studio](http://127.0.0.1:5173/). Soundboard lets you search, audition, and export recipe WAVs. Space replays the selected sound. Right Arrow approves it. Left Arrow opens a short rejection note. Reviews save to `tasks/feedback.json` through the local Vite development server.

The Lumina Zombies tab plays weapons, weather, footsteps, and creature effects in the same audio mix. Select the rifle to access auto-fire and live RPM. Use WASD or the arrow keys to walk.

## QA and integration

```sh
npm run --silent qa -- all
npm run --silent qa -- grenade-explosion
npm run catalog
npm run build
```

QA writes mono 44.1 kHz, 16-bit PCM WAVs and JSON diagnostics to `qa/output/`. Each recipe is evaluated across four deterministic seeds for a sample peak ceiling of −0.5 dBFS, gated active RMS near −18 dBFS for one-shots or −21 dBFS for loops, onset and loop-boundary continuity where applicable, and recipe-specific spectral requirements.

See the [Agent Skill](SKILL.md) for search, selective installation, and authoring. The [worker queue](tasks/queue.json) contains the next 20 recipes to build.
