import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-hoop.ts';

export default {
  id: "indoor-volleyball-short-floor-bounce",
  name: "Indoor Volleyball Short Floor Bounce",
  category: "Impacts",
  tags: ["indoor", "volleyball", "short", "floor", "bounce"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.46, 0.61, 0.04, 6100, 0.007, 0.08],
      ["contact", "cloth", 0.035, 0.23, 0.54, 174.3, 0.002],
      ['clip', source, 0.37, 0.76, 0.52, 0.19, 4758, 0.007, 0.08],
      ["contact", "cloth", 0.56, 0.27, 0.34, 241.5, 0.002],
      ["grains", "cloth", 0.61, 0.5, 0.19, 420, 12],
    ]);
  },
} satisfies SoundRecipe;
