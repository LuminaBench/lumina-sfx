import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-turbo-prop-cabin.ts';

export default {
  id: "passenger-turboprop-cabin-takeoff-surge",
  name: "Passenger turboprop cabin takeoff surge",
  category: "Aircraft",
  tags: ["passenger", "turboprop", "cabin", "takeoff", "surge", "flight", "plane", "aircraft"],
  loopable: false,
  durationSec: 6.22,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 6.22, .94, .09, 4900, .006, .41],
      ["contact", "air", 0, .12, .13, 380, .007],
    ]);
  },
} satisfies SoundRecipe;
