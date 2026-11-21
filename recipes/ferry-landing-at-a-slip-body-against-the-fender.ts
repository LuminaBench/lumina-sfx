import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-snapwater.ts';
import source2 from './_recordings/slatted-crate-settle.ts';

export default {
  id: "ferry-landing-at-a-slip-body-against-the-fender",
  name: "Ferry Landing at a Slip Body against the Fender",
  category: "Water & Fire",
  tags: ["ferry", "landing", "slip", "body", "against", "fender"],
  loopable: false,
  durationSec: 2.27,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.1, 0.84, 0.09, 2700, 0.011, 0.16],
      ['clip', source2, 0.12, 1.8, 0.38, 0.11, 2160, 0.023, 0.16],
      ["contact", "wood", 0.17, 0.35, 0.41, 218, 0.002],
    ]);
  },
} satisfies SoundRecipe;
