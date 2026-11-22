# Lumina SFX

Give a coding agent a game event and an acoustic brief. Lumina SFX gives it **2,617 searchable sound recipes**, a CPU renderer, and the tools to deliver just the sounds that game uses. Recipes combine original TypeScript synthesis and credited recording excerpts. A fixed seed reproduces the same performance offline.

## Install the skill

With Node.js 22.12+ installed, run:

```sh
npx skills add LuminaBench/lumina-sfx -g
```

The repository is currently private. Collaborators need GitHub read access and working Git credentials. With GitHub CLI, `gh auth login` followed by `gh auth setup-git` configures HTTPS access. Select your coding agent during installation, then open a fresh session in your game project. Update a CLI-managed installation with `npx skills update -g`. Remove it with `npx skills remove lumina-sfx -g`. The game retains any recipes and audio you already copied into it.

## Ask your agent

- “Use lumina-sfx in Wakefall. Play a quiet seed drop when planting succeeds, vary it across the row, and let rain sit behind it.”
- “Find a jet passing low over water. Keep the engine in front, let the spray arrive a moment later, and export a WAV for my Godot scene.”
- “Give my crafting menu a short mechanical confirmation. Combine a muted switch and a softer return, test the mix, and wire it to successful crafts.”

The agent searches the catalog by event, material, perspective and loop state. Each result gives it a stable ID, editable controls and, where applicable, recording credits. It can install the original, sculpt one cue, stack up to four, or write a new recipe. The game triggers the resulting code or imported audio at the relevant event. Rendering and playback use local CPU resources.

## Run it yourself

For a full studio checkout, run `gh repo clone LuminaBench/lumina-sfx`. Run the following from that checkout or the installed skill directory. The core tools use Node's standard library.

```sh
node scripts/search.mjs seed planting
npm run --silent qa -- plant-large-seeds
node scripts/install-sfx.mjs plant-large-seeds light-rain-loop --project /path/to/game
node scripts/remix.mjs plant-large-seeds --id greenhouse-seeds --space small_room --wetness 0.25 --format wav --dest /path/to/game/audio
```

QA writes the 44.1 kHz, 16-bit preview to `qa/output/master-wav/plant-large-seeds.wav` and reports its checksum. Use `LUMINA_QA_OUTPUT` to put large renders elsewhere. Choose `--format ts` for an editable recipe with its source dependencies. WAV works offline with Node alone. Ogg Vorbis and Opus additionally use a local FFmpeg build with the matching encoder.

| Game target | Selective install |
| --- | --- |
| Web / Three.js | Web Audio playback helper and WAV pools under `public/lumina-sfx`, editable recipes in `src/lumina-sfx` |
| Godot 4 | GDScript helper and WAVs under `res://lumina_sfx/` |
| Unity | C# component and three-variant pools under `Assets/Resources/LuminaSfx/` |
| Unreal Engine 5 | Runtime plugin and WAVs under `Content/LuminaSfx/` for Sound Wave import |
| Python / Pygame | Python helper and WAVs in `lumina_sfx/` |
| WAV only | Audio variants and checksum manifest in `audio/lumina-sfx/` |

Set `--engine web|godot|unity|unreal|python|wav` explicitly, or point `--project` at a project with engine markers. A bare directory defaults to web. Each adapter includes its own scene hookup example. The balanced game profile leaves headroom for foreground actions over ambient loops.

## Verify a build

```sh
npm run --silent qa -- all --both-levels --extremes --jobs 6 > /tmp/lumina-qa-report.json
npm run bank
```

QA tests four seeds at the default, minimum and maximum controls. It measures peaks, active loudness, transient onset, loop continuity and specified frequency bands. The release checksums cover all masters. The optional Opus bank exporter verifies each approved WAV checksum and decodes every encoded file to check its length. See [release measurements](qa/release-masters.json), [agent workflow](SKILL.md), [sound-design cookbook](references/sound-design-cookbook.md), and [recording provenance](sources/recordings.json).

Studio listening tools and personal votes live on the maintainer's machine. Local Y/N review tracks taste separately from technical QA. Code is available under the [MIT license](LICENSE). Recording excerpts carry the licenses and credits in the source inventory.
