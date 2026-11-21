import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-fighter-rise.ts';

export default {
  id: "fast-jet-climbout",
  name: "Fast Jet Climbout",
  category: "Aircraft",
  tags: ["fast", "jet", "climbout"],
  loopable: false,
  durationSec: 7.9,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 7.7, .92, .1, 11800, .025, .29],
      ["brush", "air", .33, 5.8, .26, 1220, .4],
    ]);
  },
} satisfies SoundRecipe;
