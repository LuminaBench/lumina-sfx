import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-microclick.ts';

export default {
  id: "hitmarker-cloth-and-sharp-tick",
  name: "Hitmarker cloth and sharp tick",
  category: "Footsteps & UI",
  tags: ["hitmarker", "cloth", "sharp", "tick", "event", "combat", "feedback", "hit-marker", "hit-confirm"],
  loopable: false,
  durationSec: 0.105,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .042, .72, 0, 11500, .001, .008],
      ["contact", "cloth", 0, .063, .49, 633, .00085],
      ["contact", "iron", .013, .044, .26, 2190, .0006],
    ]);
  },
} satisfies SoundRecipe;
