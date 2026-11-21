import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-truck-exterior.ts';

export default {
  id: "heavy-diesel-work-truck-outside-power-hold-loop",
  name: "Heavy diesel work truck outside power hold loop",
  category: "Vehicles & Engines",
  tags: ["heavy", "diesel", "work", "truck", "outside", "power", "hold", "vehicle"],
  loopable: true,
  durationSec: 5.02,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.14, .98, .24, 5650, 0, 0],
    ]);
  },
} satisfies SoundRecipe;
