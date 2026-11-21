---
name: lumina-sfx
description: Find, install, generate, and remix original procedural sound effects for indie games and web apps. Use for Sounds-as-Code, Web Audio API playback, TypeScript DSP, PCM WAV export, game audio cues, footsteps, weather loops, weapon or combat game SFX, creature vocals, vehicles, and UI sounds.
---

# Lumina SFX

The catalog indexes deterministic TypeScript recipes. A recipe produces mono PCM with CPU-only DSP. Everything needed to render a sound is in the recipe and its local imports.

## Find and install

Read [catalog.json](catalog.json) or run the search script from the skill directory. Search terms match names, ids, categories, and tags. Use `--loop` for seamless beds and `--json` for structured results.

```sh
node scripts/search.mjs rain --loop --json
node scripts/search.mjs --category Weapons
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

## Create or remix a recipe

1. Read a nearby [recipe](recipes/) and the [SoundRecipe contract](engine/types.ts). Add a file named `recipes/<id>.ts` that default-exports one recipe using `satisfies SoundRecipe`. Give it a descriptive name, search tags, a duration in seconds, and parameter ranges that change audible character.
2. Return exactly `ctx.frames` mono samples in a `Float32Array`. Use `ctx.sampleRate` for time and filters, and `ctx.random()` for every random choice. Keep each voice self-contained. Use local relative `.ts` imports and omit runtime dependencies, recordings, and pretrained audio models.
3. Use the [DSP primitives](engine/dsp.ts) for noise bands, transient layers, modal resonators, formants, saturation, and reflections. For loops, synthesize through the extra continuation frames supplied by the renderer. Keep the bed active around the seam so the renderer can crossfade its head.
4. Run `npm run --silent qa -- <id>` for JSON diagnostics and the preview WAV in `qa/output/`. The test checks the default parameters across four seeds. Check any new parameter extremes as part of authoring. Add an explicit `spectrum` expectation when a sound relies on a frequency band.
5. Run `npm run catalog` after adding or changing metadata. For a leased queue ticket, follow the reporting guidance in [tasks/WORKER_PROMPT.md](tasks/WORKER_PROMPT.md).

For listening and review, run `npm install` in the studio and `npm run demo`. Open the local URL Vite prints. Space replays, Right Arrow approves, and Left Arrow opens the rejection note. The development server saves review decisions in [tasks/feedback.json](tasks/feedback.json).
