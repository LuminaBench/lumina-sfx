import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';
import source2 from './_recordings/car-seat-belt-click.ts';
import source3 from './_recordings/key-ring-jingle.ts';

export default {
  id: "leather-halter-buckle-fasten",
  name: "Leather Halter Buckle Fasten",
  category: "Animals",
  tags: ["leather", "halter", "buckle", "fasten", "livestock"],
  loopable: false,
  durationSec: 0.81,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .55, .72, .04, 8900],
      ['clip', source2, .20, .37, .65, .003, 11200],
      ['clip', source3, .29, .24, .22, .08, 11800],
    ]);
  },
} satisfies SoundRecipe;
