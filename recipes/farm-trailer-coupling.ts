import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-heavy-hatch.ts';
import source2 from './_recordings/chain-rattle-short.ts';

export default {
  id: "farm-trailer-coupling",
  name: "Farm Trailer Coupling",
  category: "Vehicles & Engines",
  tags: ["farm", "trailer", "coupling", "vehicle"],
  loopable: false,
  durationSec: 1.04,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .72, .79, .02, 8000],
      ['clip', source2, .107, .69, .49, .016, 10400],
      ["contact", "iron", .24, .68, .45, 216, .0013],
    ]);
  },
} satisfies SoundRecipe;
