import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-jet-takeoff.ts';

export default {
  id: "supersonic-style-fictional-jet-departure",
  name: "Supersonic-style fictional jet departure",
  category: "Aircraft",
  tags: ["supersonic", "style", "fictional", "jet", "departure", "flight"],
  loopable: false,
  durationSec: 4.8,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.8, .68, .09, 7900, .012, .76],
      ["contact", "air", 0, .19, .24, 453, .005],
      ["brush", "air", .13, 3.94, .52, 2410, .21],
      ["motor", 0, 3.96, .22, 420, 124, .013, .66],
    ]);
  },
} satisfies SoundRecipe;
