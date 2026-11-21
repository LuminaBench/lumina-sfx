import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-heavy-hatch.ts';

export default {
  id: "drone-landing-gear-deploy",
  name: "Drone Landing Gear Deploy",
  category: "Sci-Fi & UI",
  tags: ["drone", "landing", "gear", "deploy"],
  loopable: false,
  durationSec: 1.28,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["motor", 0, .93, .49, 293, 152, .029, .65],
      ['clip', source, .28, .56, .36, .07, 5500],
      ["contact", "iron", .42, .21, .61, 488, .002],
      ["contact", "iron", .57, .28, .65, 370, .002],
      ["contact", "iron", .783, .27, .60, 273, .002],
    ]);
  },
} satisfies SoundRecipe;
