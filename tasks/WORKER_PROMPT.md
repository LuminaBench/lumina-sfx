# Lumina SFX worker prompt

Implement the ticket assigned by the coordinator from [queue.json](queue.json). Read [the skill](../SKILL.md), the contract, and the ticket's blueprint before writing the recipe. The queue duration is a starting point. Adjust it if the sound needs a longer release or a loop needs an even period, and explain the change.

## Recipe and DSP

Create `recipes/<ticket-id>.ts` with a default export that satisfies `SoundRecipe`. Match the ticket's category and loop flag. Pick a short name and searchable tags, and include a parameter that produces an audible change. Compose a new voice from original DSP. Use the blueprint for structure and primitives. Keep the design CPU-only and make all variation reproducible through `ctx.random()`.

Keep small voice-specific functions beside the recipe. Coordinate before editing runtime files or shared recipe helpers on parallel branches. Leave the shared queue, catalog, and reviewer feedback file to the coordinator. The catalog is regenerated after recipes are integrated.

For continuous loops, generate signal through every requested frame including the overlap. Use smooth periodic or stationary modulation around the wrap. For cinematic one-shots, retain the intended arc and give the onset an immediate audible element. Add a spectral expectation if the ticket specifies a band.

## Checks and handoff

Run `npm run --silent qa -- <ticket-id>` and `npm run typecheck`. Use failed diagnostic values to fix the recipe and rerun. The WAV is in `qa/output/<ticket-id>.wav`. Listen if playback is available, then check the parameter extremes and report any remaining auditory judgment for the reviewer.

Return the recipe ID, files changed, QA pass count, and the reason for any design change or remaining concern. Include the preview WAV path and the most relevant metric from QA. The coordinator integrates each recipe, reruns the full suite, and updates the catalog and ticket status.
