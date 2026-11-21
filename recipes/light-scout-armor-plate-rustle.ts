import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "light-scout-armor-plate-rustle",
  name: "Light scout armor plate rustle",
  category: "Weapons",
  tags: ["light", "scout", "armor", "plate", "rustle"],
  loopable: false,
  durationSec: 0.87,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .79, .73, .013, 5700, .004, .14],
      ["contact", "iron", 0, .041, .23, 845, .0012],
      ["grains", "iron", .11, .53, .25, 920, 5],
      ["contact", "cloth", .43, .23, .39, 330, .008],
    ]);
  },
} satisfies SoundRecipe;
