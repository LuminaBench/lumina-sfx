# Lumina SFX worker prompt

Implement the `ready` ticket assigned by the coordinator from [queue.json](queue.json). Read [the skill](../SKILL.md), the contract, and the ticket's blueprint before writing the recipe. Read the [listening review guide](../references/listening-review.md) when building into an established collection. The queue duration is a starting point. Adjust it if the sound needs a longer release or a loop needs an even period, and explain the change.

## Recipe and DSP

Create `recipes/<ticket-id>.ts` with a default export that satisfies `SoundRecipe`. Match the ticket's category and loop flag. Pick a short name and searchable tags, and include a parameter that produces an audible change. Use verified public-domain field recordings for grounded, identifiable sounds where they help. Record provenance as described in the listening guide. Use original DSP for stylized cues. Keep rendering CPU-only and random choices reproducible with `ctx.random()` or the resolved seed.

Keep small voice-specific functions beside the recipe. Coordinate before editing runtime files or shared recipe helpers on parallel branches. Leave the shared queue, catalog, and reviewer feedback file to the coordinator. The catalog is regenerated after recipes are integrated.

For continuous loops, generate signal through every requested frame including the overlap. Use smooth periodic or stationary modulation around the wrap. For cinematic one-shots, retain the intended arc and give the onset an immediate audible element. Add a spectral expectation if the ticket specifies a band.

## Checks and handoff

Run `npm run --silent qa -- <ticket-id> --extremes` and `npm run typecheck`. Use failed diagnostic values to fix the recipe and rerun. Read the `wav` path from the report. For reassigned QA work, read `qa/output/rework/*.json` first. Each pending ticket names the seed, control setting, suspected frequency and start time of stationary buzz. Inspect that region, repair the recipe or replace the offending layer with a credited recording, and rerun the same QA settings to clear the ticket. Listen if playback is available and report any remaining auditory judgment for the reviewer.

Return the recipe ID, files changed, QA pass count, and the reason for any design change or remaining concern. Include the preview WAV path and the most relevant metric from QA. The coordinator integrates each recipe, reruns the full suite, and updates the catalog and marks QA-passing candidates `review` with their collection.
