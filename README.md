# Lumina SFX Studio

An Agent Skill and TypeScript sound effects engine for games and web apps. The library includes original DSP and source-credited public-domain recordings. Browser preview and offline WAV rendering use the same seeded PCM pipeline.

The library contains **1,108 sound recipes**. Browse the [vehicle and combat audio release](tasks/MOTION_COMBAT.md), the [first 1,000 cues](tasks/MILESTONE_1000.md), or run `npm run search -- --collection "Maritime · Motors and deck"` to find sounds by theme.

## Run the studio

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run demo
```

Open [Quick review](http://127.0.0.1:5173/#review) for one sound at a time. The collection picker shows how many sounds are left per batch. Press Y or N or click Yes or No to record a decision and play the next pending sound. Start listening once if browser audio is blocked until a gesture.

Soundboard lets you search, audition, and export recipe WAVs. Space replays the selected sound. Right Arrow approves it. Left Arrow opens a short rejection note. Reviews save to `tasks/feedback.json` through the local Vite development server.

Use **Balanced levels** for audition or export when cues need to sit more consistently together. The optional playback profile leaves room for ambience, detail, and foreground impact. See the [calibration guide](tasks/DEMO_EXPANSION.md#level-calibration).

The Lumina Zombies tab plays weapons, weather, footsteps, and creature effects in the same audio mix. Select the rifle to access auto-fire and live RPM. Use WASD or the arrow keys to walk.

## QA and integration

```sh
npm run --silent qa -- all
npm run --silent qa -- --collection "Farm · Harvest" --extremes
npm run catalog
npm run build
```

QA writes mono 44.1 kHz, 16-bit PCM WAVs and JSON diagnostics to `qa/output/`. Each recipe is evaluated across four deterministic seeds for a sample peak ceiling of −0.5 dBFS, gated active RMS near the recipe's `targetRmsDbfs` (defaults of −18 dBFS for one-shots and −21 dBFS for loops), onset and loop-boundary continuity where applicable, and recipe-specific spectral requirements. Use `--extremes` to check minimum and maximum parameter settings as well.

See the [Agent Skill](SKILL.md) for search, selective installation, and authoring. The [roadmap](tasks/ROADMAP.md) lays out the path to 1,000 game cues, starting with farming for Wakefall. The [worker queue](tasks/queue.json) contains review collections and planned recipes. Run `npm run --silent review:summary` for collection-level results.
