# Lumina SFX

Describe what a player should hear, from a boot on gravel to a storm rolling in over the sea.<br>
Your coding agent can find a sound, layer a new one and deliver it to your game with an offline CPU renderer.

![2,617 Sounds](https://img.shields.io/badge/2%2C617-Sounds-355C63) ![Offline CPU](https://img.shields.io/badge/Offline-CPU-355C63) ![Cross-Engine](https://img.shields.io/badge/Cross--Engine-355C63) ![Free for Commercial Games](https://img.shields.io/badge/Free_for_Commercial_Games-31694F)

## Quick Start

With Node.js 22.12 or newer and Git installed, run this once and select your coding agent.

```sh
npx skills add LuminaBench/lumina-sfx -g
```

Open a fresh agent session in your project and ask it to use `lumina-sfx`. Your players only need the audio or runtime your game ships.

**Update installed global skills**

```sh
npx skills update -g
```

**Remove Lumina SFX**

```sh
npx skills remove lumina-sfx -g
```

## What You Can Ask Your AI

- “Find three short menu clicks for my browser game. Give me WAV previews so I can pick the one that feels right.”
- “Build a coastal storm for my indie RPG. Start with waves and wind, bring in a sharp thunderclap after four seconds, then let a softer rumble roll away.”
- “Install grass and gravel footsteps in my Godot scene. Trigger them when a foot lands and vary each step so walking sounds natural.”

## Supported Engines

| Target | What goes into your project |
| --- | --- |
| Web / Three.js | Web Audio player, editable TypeScript recipes and WAV variants |
| Godot 4 | GDScript playback helper and WAVs |
| Unity | C# component and WAVs for AudioClips |
| Unreal Engine 5 | Runtime plugin and WAVs for Sound Wave import |
| Python / Pygame | Mixer helper and WAV variants |
| WAV | Audio files and a checksum manifest for any compatible editor or engine |

<details>
<summary>CLI commands for search, remix, export and QA</summary>

Run these from the installed skill directory or a clone of this repository. Replace the example game paths with your own.

```sh
node scripts/search.mjs rain --loop
node scripts/remix.mjs plant-large-seeds --id greenhouse-seeds --space small_room --wetness 0.25 --format wav --dest /path/to/game/audio
node scripts/install-sfx.mjs grass-footstep gravel-footstep --engine godot --project /path/to/game
npm run --silent qa -- grass-footstep --both-levels --extremes
```

QA writes a 44.1 kHz, 16-bit preview under `qa/output/master-wav/` and checks peak level, loudness, onset and applicable loop boundaries. WAV and editable TypeScript exports run offline with Node alone. Ogg Vorbis and Opus use a local FFmpeg encoder.

For per-layer gain, timing and sound-design controls, see the [agent workflow](SKILL.md) and [sound-design cookbook](references/sound-design-cookbook.md).

</details>

## License

You can render, modify and ship the sounds in personal or commercial games, apps, videos and demos for free, with no royalties or audio credit required. The engine and tools use MIT, and the sound library license prohibits redistributing, rebranding or reselling the bank or rendered collections as a competing SFX pack, sample library, training dataset or Agent Skill. [Full license](LICENSE)

---

**Support** · [LuminaBench](https://luminabench.com) · [About GitHub Sponsors](https://github.com/sponsors)
