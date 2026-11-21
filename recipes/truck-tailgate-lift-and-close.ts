import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-heavy-hatch.ts';
import source2 from './_recordings/car-door-shut-inside.ts';

export default {
  id: "truck-tailgate-lift-and-close",
  name: "Truck Tailgate Lift and Close",
  category: "Vehicles & Engines",
  tags: ["truck", "tailgate", "lift", "close", "vehicle"],
  loopable: false,
  durationSec: 1.27,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .89, .79, .05, 8000],
      ['clip', source2, .51, .69, .55, .045, 5100],
      ["contact", "iron", .61, .53, .43, 237, .002],
    ]);
  },
} satisfies SoundRecipe;
