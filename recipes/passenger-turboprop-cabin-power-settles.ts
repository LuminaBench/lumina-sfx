import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-prop-cabin.ts';

export default {
  id: "passenger-turboprop-cabin-power-settles",
  name: "Passenger turboprop cabin power settles",
  category: "Aircraft",
  tags: ["passenger", "turboprop", "cabin", "power", "settles"],
  loopable: false,
  durationSec: 5.1,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.10, 1, .11, 5000, .004, .49],
      ["contact", "air", 0, .084, .07, 339, .003],
    ]);
  },
} satisfies SoundRecipe;
