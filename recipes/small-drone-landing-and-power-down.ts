import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-quadcopter-landing.ts';

export default {
  id: "small-drone-landing-and-power-down",
  name: "Small Drone Landing and Power Down",
  category: "Aircraft",
  tags: ["small", "drone", "landing", "power", "down"],
  loopable: false,
  durationSec: 7.7,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 7.56, .86, 3.65, 9600, .016, .25],
      ["contact", "rubber", 5.71, .28, .32, 302, .006],
    ]);
  },
} satisfies SoundRecipe;
