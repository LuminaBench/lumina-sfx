import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/rock-pile-impact.ts';
import source2 from './_recordings/dry-sand-footstep.ts';

export default {
  id: "large-pebbles-dropped-into-sand",
  name: "Large Pebbles Dropped into Sand",
  category: "Impacts",
  tags: ["large", "pebbles", "dropped", "sand"],
  loopable: false,
  durationSec: 0.76,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .42, .69, .10, 4300],
      ['clip', source2, .13, .43, .53, .032, 6250],
      ["contact", "stone", .26, .14, .47, 420, .002],
      ["contact", "soil", .44, .2, .34, 348, .0017],
    ]);
  },
} satisfies SoundRecipe;
