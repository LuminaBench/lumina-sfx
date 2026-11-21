import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-marine-engine.ts';

export default {
  id: "working-motorboat-steady-offshore-loop",
  name: "Working motorboat steady offshore loop",
  category: "Water & Fire",
  tags: ["working", "motorboat", "steady", "offshore", "boat", "marine"],
  loopable: true,
  durationSec: 6.25,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 6.37, .95, .27, 5200, 0, 0],
    ]);
  },
} satisfies SoundRecipe;
