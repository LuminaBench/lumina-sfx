import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-truck-load.ts';

export default {
  id: "heavy-duty-diesel-towing-pullaway",
  name: "Heavy-duty diesel towing pullaway",
  category: "Vehicles & Engines",
  tags: ["heavy", "duty", "diesel", "towing", "pullaway", "car", "engine", "vehicle"],
  loopable: false,
  durationSec: 5.5,
  targetRmsDbfs: -24.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.5, .83, .07, 4600, .004, .38],
      ["contact", "iron", 0, .053, .13, 317, .001],
    ]);
  },
} satisfies SoundRecipe;
