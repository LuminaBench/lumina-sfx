import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-canopy-rustle.ts';
import source2 from './_recordings/seed-packet-rustle.ts';

export default {
  id: "softbox-fabric-unfold",
  name: "Softbox Fabric Unfold",
  category: "Props & Interactions",
  tags: ["softbox", "fabric", "unfold"],
  loopable: false,
  durationSec: 1.41,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.23, .83, .04, 7500, .024, .21],
      ['clip', source2, .27, .61, .31, .06, 10100],
      ["brush", "cloth", .52, .74, .29, 680, .045],
    ]);
  },
} satisfies SoundRecipe;
