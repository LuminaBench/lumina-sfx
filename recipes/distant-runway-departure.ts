import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-jet-takeoff.ts';

export default {
  id: "distant-runway-departure",
  name: "Distant Runway Departure",
  category: "Aircraft",
  tags: ["distant", "runway", "departure"],
  loopable: false,
  durationSec: 8.1,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 7.99, .93, .06, 5680, .025, .45],
      ["brush", "air", .26, 6.31, .14, 617, .91],
    ]);
  },
} satisfies SoundRecipe;
