import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "padded-sling-strap-and-swivel-creak",
  name: "Padded sling strap and swivel creak",
  category: "Weapons",
  tags: ["padded", "sling", "strap", "swivel", "creak"],
  loopable: false,
  durationSec: 1.03,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .88, .5, .015, 5300, .004, .15],
      ['clip', source2, .08, .84, .54, .04, 3500, .024, .22],
      ["contact", "iron", 0, .055, .30, 902, .0013],
      ["contact", "iron", .41, .096, .24, 730, .001],
    ]);
  },
} satisfies SoundRecipe;
