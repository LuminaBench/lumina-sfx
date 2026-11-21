import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-microclick.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "prop-launcher-brass-catches-in-a-pouch",
  name: "Prop launcher brass catches in a pouch",
  category: "Weapons",
  tags: ["prop", "launcher", "brass", "catches", "pouch", "reload", "mechanical", "weapon"],
  loopable: false,
  durationSec: 0.64,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .044, .50, 0, 8900, .001, .008],
      ['clip', source2, .01, .60, .70, .074, 4150, .004, .11],
      ["contact", "iron", .064, .066, .51, 1360, .0008],
      ["contact", "cloth", .096, .21, .62, 487, .004],
    ]);
  },
} satisfies SoundRecipe;
