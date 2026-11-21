import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-pass.ts';
import source2 from './_recordings/field-brook-bed.ts';

export default {
  id: "coastal-floatplane-arriving-on-water",
  name: "Coastal Floatplane Arriving on Water",
  category: "Aircraft",
  tags: ["coastal", "floatplane", "arriving", "water"],
  loopable: false,
  durationSec: 3.82,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.85, 0.38, 0.64, 2200, 0.021, 0.53],
      ["contact", "water", 0.34, 0.24, 0.62, 231.8, 0.002],
      ["grains", "water", 0.39, 1.94, 0.42, 390, 19],
      ['clip', source2, 0.76, 1.58, 0.29, 0.01, 2640, 0.007, 0.08],
    ]);
  },
} satisfies SoundRecipe;
