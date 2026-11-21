import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/truck-air-brake-release.ts';
import source2 from './_recordings/response-rocker.ts';

export default {
  id: "heavy-truck-pneumatic-brake-seat",
  name: "Heavy truck pneumatic brake seat",
  category: "Vehicles & Engines",
  tags: ["heavy", "truck", "pneumatic", "brake", "seat", "vehicle"],
  loopable: false,
  durationSec: 1.62,
  targetRmsDbfs: -26.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.54, .83, .016, 6250, .003, .25],
      ['clip', source2, 0, .090, .49, 0, 8200, .001, .019],
      ["contact", "iron", .721, .19, .45, 293, .002],
    ]);
  },
} satisfies SoundRecipe;
