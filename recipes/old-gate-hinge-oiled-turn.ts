import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/paddock-gate-swing.ts';
import source2 from './_recordings/leather-strap-flex.ts';

export default {
  id: "old-gate-hinge-oiled-turn",
  name: "Old Gate Hinge Oiled Turn",
  category: "Impacts",
  tags: ["old", "gate", "hinge", "oiled", "turn"],
  loopable: false,
  durationSec: 0.88,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .76, .73, .108, 6100],
      ["brush", "iron", .105, .71, .46, 490, .035],
      ['clip', source2, .33, .41, .29, .19, 6700],
    ]);
  },
} satisfies SoundRecipe;
