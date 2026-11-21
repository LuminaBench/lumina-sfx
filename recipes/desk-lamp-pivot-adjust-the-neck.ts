import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';

export default {
  id: "desk-lamp-pivot-adjust-the-neck",
  name: "Desk Lamp Pivot Adjust the Neck",
  category: "Props & Interactions",
  tags: ["desk", "lamp", "pivot", "adjust", "neck"],
  loopable: false,
  durationSec: 0.82,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.7, 0.81, 0.014, 6600, 0.007, 0.08],
      ["brush", "iron", 0.07, 0.57, 0.25, 1028.16, 0.032],
      ["contact", "iron", 0.22, 0.23, 0.38, 612, 0.002],
    ]);
  },
} satisfies SoundRecipe;
