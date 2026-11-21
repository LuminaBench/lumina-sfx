import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-heavy-hatch.ts';

export default {
  id: "kitchen-kettle-lid-set-into-rim",
  name: "Kitchen Kettle Lid Set into Rim",
  category: "Props & Interactions",
  tags: ["kitchen", "kettle", "lid", "set", "rim"],
  loopable: false,
  durationSec: 1.04,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.6, 0.65, 0.22, 6424, 0.007, 0.08],
      ["contact", "iron", 0.067, 0.29, 0.44, 354.9, 0.002],
      ["grains", "iron", 0.107, 0.51, 0.22, 910, 8],
      ["contact", "wood", 0.525, 0.3, 0.39, 300.3, 0.002],
    ]);
  },
} satisfies SoundRecipe;
