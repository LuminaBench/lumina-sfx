import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/demo-jet-pass.ts';
import wash from './_recordings/clarity-field.ts';
import detail from './_recordings/demo-sheltered-wind.ts';

export default {
  id: "arcade-supersonic-pass-camera-pass-and-tail", name: "Arcade supersonic pass — camera pass and tail", category: "Missiles",
  tags: ["flyby", "cinematic", "flight", "arcade", "supersonic", "pass", "open", "field-foley"], loopable: false, durationSec: 1.94,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "pass", trajectory: "pass", space: "open", at: [0], color: 9288, mass: 0.67, edge: 0.65, scatter: 1, panDepth: 0.58,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
