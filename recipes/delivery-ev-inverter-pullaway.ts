import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-ev-surface.ts';

export default {
  id: "delivery-ev-inverter-pullaway",
  name: "Delivery EV inverter pullaway",
  category: "Vehicles & Engines",
  tags: ["delivery", "ev", "inverter", "pullaway", "car", "engine", "vehicle"],
  loopable: false,
  durationSec: 3.6,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.48, .67, .04, 6400, .005, .38],
      ["tone", 0, 3.42, .14, 171, 792, .016, .42],
      ["brush", "rubber", .28, 2.9, .14, 590, .082],
    ]);
  },
} satisfies SoundRecipe;
