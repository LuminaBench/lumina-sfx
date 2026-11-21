import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/car-wet-braking-stop.ts';

export default {
  id: "tire-skid-halt",
  name: "Tire skid halt",
  category: "Vehicles & Engines",
  tags: ["tire", "skid", "halt", "vehicle"],
  loopable: false,
  durationSec: 1.42,
  targetRmsDbfs: -25.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.42, .73, .11, 8200, .004, .16],
      ["tone", 0, .56, .21, 920, 480, .005, .4],
      ["brush", "rubber", .03, .78, .53, 1110, .011],
      ["grains", "stone", .11, .84, .41, 1040, 12],
      ["contact", "rubber", .83, .24, .59, 299, .004],
    ]);
  },
} satisfies SoundRecipe;
