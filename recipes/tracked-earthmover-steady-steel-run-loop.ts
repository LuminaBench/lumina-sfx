import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-track-roll.ts';

export default {
  id: "tracked-earthmover-steady-steel-run-loop",
  name: "Tracked earthmover steady steel run loop",
  category: "Vehicles & Engines",
  tags: ["tracked", "earthmover", "steady", "steel", "run", "vehicle"],
  loopable: true,
  durationSec: 5.65,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.77, .97, .30, 7900, 0, 0],
    ]);
  },
} satisfies SoundRecipe;
