import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/demo-jet-pass.ts';
import wash from './_recordings/response-air-pressure.ts';
import detail from './_recordings/demo-flag-rush.ts';

export default {
  id: "sci-fi-interceptor-missile-camera-pass-and-tail", name: "Sci-fi interceptor missile — camera pass and tail", category: "Missiles",
  tags: ["flyby", "cinematic", "flight", "sci", "fi", "interceptor", "missile", "open", "field-foley"], loopable: false, durationSec: 1.94,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "pass", trajectory: "pass", space: "open", at: [0], color: 10908, mass: 0.66, edge: 0.65, scatter: 1, panDepth: 0.58,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
