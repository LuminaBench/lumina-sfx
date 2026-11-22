import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import carWetAsphaltPass from './_recordings/car-wet-asphalt-pass.ts';
import fieldWetRoad from './_recordings/field-wet-road.ts';
import milestoneSnapwater from './_recordings/milestone-snapwater.ts';
import wateringGardenSoak from './_recordings/watering-garden-soak.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'wheel-arch-throws-a-sheet-of-spray', name: "Wheel Arch Throws a Sheet of Spray", category: 'Vehicles & Engines',
  tags: ["wheel-arch", "spray", "puddle", "splash", "wet-road", "car", "water"],
  durationSec: 3.2, loopable: false, mixRole: 'vehicle', targetRmsDbfs: -14.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...performanceCredits(carWetAsphaltPass, fieldWetRoad, milestoneSnapwater, wateringGardenSoak, shallowWaterFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.intensity, [
      [carWetAsphaltPass, 0, 1.15, 0.54, 1.04, 5600, 0.04, 0.14, 0.4],
      [fieldWetRoad, 0.18, 1.05, 0.48, 1.02, 7400, 0.06, 0.14, 0.38],
      [milestoneSnapwater, 0.38, 0.92, 0.88, 1.12, 11400, 0.0, 0.012, 0.38],
      [wateringGardenSoak, 0.52, 1.2, 0.84, 1.1, 10200, 0.02, 0.08, 0.46],
      [wateringGardenSoak, 0.94, 1.2, 0.72, 0.98, 7800, 0.1, 0.16, 0.52],
      [shallowWaterFootstep, 1.18, 0.62, 0.5, 1.18, 8600, 0.02, 0.04, 0.28],
      [fieldWetRoad, 1.35, 1.15, 0.54, 0.94, 6200, 0.14, 0.2, 0.52],
      [shallowWaterFootstep, 1.65, 0.68, 0.42, 1.06, 6800, 0.08, 0.06, 0.32],
      [wateringGardenSoak, 1.82, 1.2, 0.4, 0.86, 4800, 0.16, 0.24, 0.64],
      [carWetAsphaltPass, 2.0, 1.2, 0.34, 0.84, 3400, 0.18, 0.24, 0.68],
    ]);
  },
} satisfies SoundRecipe;
