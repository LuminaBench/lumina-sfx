import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';
import source3 from './_recordings/burlap-feed-sack-open.ts';

export default {
  id: "small-canvas-satchel-across-shoulder",
  name: "Small Canvas Satchel across Shoulder",
  category: "Footsteps & UI",
  tags: ["small", "canvas", "satchel", "across", "shoulder"],
  loopable: false,
  durationSec: 0.9,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .55, .62, .035, 6600],
      ['clip', source2, .045, .69, .58, .025, 6400],
      ['clip', source3, .32, .46, .42, .02, 6060],
    ]);
  },
} satisfies SoundRecipe;
