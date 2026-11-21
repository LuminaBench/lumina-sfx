import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/ceramic-mug-set-down.ts';

export default {
  id: "ceramic-mug-on-cork-set-down",
  name: "Ceramic Mug on Cork Set Down",
  category: "Props & Interactions",
  tags: ["ceramic", "mug", "cork", "set", "down"],
  loopable: false,
  durationSec: 0.82,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.7, 0.81, 0.014, 4900, 0.007, 0.08],
      ["brush", "wood", 0.07, 0.57, 0.25, 514.08, 0.032],
      ["contact", "wood", 0.22, 0.23, 0.38, 306, 0.002],
    ]);
  },
} satisfies SoundRecipe;
