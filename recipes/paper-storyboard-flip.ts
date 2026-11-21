import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/book-page-turn.ts';
import source2 from './_recordings/seed-packet-rustle.ts';

export default {
  id: "paper-storyboard-flip",
  name: "Paper Storyboard Flip",
  category: "Props & Interactions",
  tags: ["paper", "storyboard", "flip"],
  loopable: false,
  durationSec: 0.7,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .52, .77, .037, 11500],
      ['clip', source2, .217, .43, .38, .14, 8200],
    ]);
  },
} satisfies SoundRecipe;
