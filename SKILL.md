---
name: lumina-sfx
description: Find, install, generate, and remix procedural sound effects and verified public-domain recordings for indie games and web apps. Use for Sounds-as-Code, Web Audio API playback, TypeScript DSP, PCM WAV export, planting and harvest sounds, livestock and farm habitats, footsteps, weather, game combat SFX, impacts, vehicles and engines, interface alerts, fantasy and sci-fi effects, and rapid listening review.
---

# Lumina SFX

The catalog indexes deterministic TypeScript recipes. Recipes produce mono PCM through CPU-only DSP and can include verified public-domain source audio. Everything needed to render a sound is in the recipe and its local imports.

## Find and install

Read [catalog.json](catalog.json) or run the search script from the skill directory. Search terms match names, ids, collections, categories, and tags. Use `--collection` for a themed group, `--loop` for seamless beds, and `--json` for structured results.

```sh
node scripts/search.mjs rain --loop --json
node scripts/search.mjs --category Weapons
node scripts/search.mjs --collection "Water · Boats and shore" --loop
```

From the recipient project, invoke the installer by its absolute path in this skill. Select recipe IDs directly. The installer copies the small runtime, selected recipe files, and their transitive TypeScript dependencies. It supports repeat installs and reports conflicting local edits.

```sh
node /absolute/path/to/lumina-sfx/scripts/install-sfx.mjs   concrete-footstep light-rain-loop --dest ./src/lumina-sfx
```

Use a TypeScript-aware bundler for browser apps. For Node.js 22.12+, use `--experimental-strip-types` when native TypeScript stripping needs explicit enabling. Import the recipe file directly so the target app pulls only the sounds it uses.

```ts
import { SfxPlayer, encodeWav, renderSound } from './lumina-sfx/engine/index.ts';
import step from './lumina-sfx/recipes/concrete-footstep.ts';

// Browser event handler, after a user gesture.
await audioContext.resume();
const footstep = new SfxPlayer(audioContext, step, { intensity: 0.85 });
footstep.play();
footstep.setIntensity(0.6);

// Shared offline path. Write the buffer as bytes in Node or use it in a Blob in the browser.
const wav = encodeWav(renderSound(step, { seed: 23, params: { heel: 0.8 } }));
```

For playback, retain the player between triggers to cycle seeded buffers and apply pitch and filter micro-variation. Use `play({ vary: false })` to listen to the baseline seed. A loopable recipe loops by default. Use `stopAll()` to release active voices and stop repeat scheduling. Set cadence with `setRpm()` and use `startRepeating()` and `stopRepeating()`.

If cues vary too much in the game mix, audition and export with **Balanced levels**. The same profile is available through `new SfxPlayer(context, recipe, { level: 'balanced' })` and `renderSound(recipe, { level: 'balanced' })`. It adjusts levels by mix role with sample-peak headroom. The original render is the default.

## Create or remix a recipe

1. Read a nearby [recipe](recipes/) and the [SoundRecipe contract](engine/types.ts). Add a file named `recipes/<id>.ts` that default-exports one recipe using `satisfies SoundRecipe`. Give it a descriptive name, search tags, a duration in seconds, and parameter ranges that change audible character.
2. Return exactly `ctx.frames` mono samples in a `Float32Array`. Use `ctx.sampleRate` for time and filters, and `ctx.random()` for every random choice. Keep each voice self-contained. Use local relative `.ts` imports and keep the runtime dependency-free. For realistic cues, use [verified CC0 or public-domain recordings](references/listening-review.md#use-recorded-audio) where they improve recognition.
3. Use the [DSP primitives](engine/dsp.ts) for noise bands, transient layers, modal resonators, formants, saturation, and reflections. For loops, synthesize through the extra continuation frames supplied by the renderer. Keep the bed active around the seam so the renderer can crossfade its head.
4. Run `npm run --silent qa -- <id> --extremes` for JSON diagnostics and the preview WAV in `qa/output/`. QA renders four seeds at default parameters. The flag adds minimum and maximum settings. Use `--collection "Farm · Harvest"` in place of the ID to check a published review batch. Add an explicit `spectrum` expectation when a sound relies on a frequency band.
5. Run `npm run catalog` after adding or changing metadata. For a leased queue ticket, follow the reporting guidance in [tasks/WORKER_PROMPT.md](tasks/WORKER_PROMPT.md).

## Review a batch

Run `npm run demo` and open [Quick review](http://127.0.0.1:5173/#review). Choose a collection to hear a short related batch. Press Y or N, or use the Yes and No buttons. The next pending cue plays after each decision. Space replays the current cue. Use Soundboard for search, WAV export, and written feedback.

Use Gemini 4 Neon through Antigravity as a helper when authoring, revising, or reviewing Lumina sounds. Give it relevant public references and measured diagnostics. Use [the listening review guide](references/listening-review.md) when expanding a family, preparing a batch, or calibrating new sounds from [saved user decisions](tasks/feedback.json).

See the [1,000-sound release](tasks/MILESTONE_1000.md), [demo expansion and level calibration](tasks/DEMO_EXPANSION.md), and the [queue](tasks/queue.json) for individual tickets.
