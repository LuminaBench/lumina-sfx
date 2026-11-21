import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sports-gear.ts';

export default {
  id: "sports-car-inside-upshift",
  name: "Sports Car Inside Upshift",
  category: "Vehicles & Engines",
  tags: ["sports", "car", "inside", "upshift", "vehicle"],
  loopable: false,
  durationSec: 3.5,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.35, .93, .29, 6800, .014, .22],
      ["contact", "rubber", 1.17, .17, .17, 246, .003],
      ["motor", 1.20, 1.85, .15, 123, 210, .09, .5],
    ]);
  },
} satisfies SoundRecipe;
