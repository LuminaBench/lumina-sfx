import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-hoop.ts';

export default {
  id: "indoor-volleyball-damped-receive",
  name: "Indoor Volleyball Damped Receive",
  category: "Impacts",
  tags: ["indoor", "volleyball", "damped", "receive"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.65, 0.76, 0.03, 6100, 0.007, 0.08],
      ["contact", "cloth", 0.014, 0.24, 0.57, 210, 0.002],
      ["grains", "cloth", 0.064, 0.47, 0.15, 386.4, 9],
    ]);
  },
} satisfies SoundRecipe;
