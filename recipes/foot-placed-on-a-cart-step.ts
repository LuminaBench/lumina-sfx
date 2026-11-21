import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/metal-deck-footstep.ts';
import source2 from './_recordings/field-heavy-hatch.ts';

export default {
  id: "foot-placed-on-a-cart-step",
  name: "Foot Placed on a Cart Step",
  category: "Footsteps & UI",
  tags: ["foot", "placed", "cart", "step"],
  loopable: false,
  durationSec: 0.64,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .52, .77, .041, 8700],
      ['clip', source2, .08, .39, .28, .40, 7200],
      ["contact", "iron", .021, .32, .37, 360, .0018],
    ]);
  },
} satisfies SoundRecipe;
