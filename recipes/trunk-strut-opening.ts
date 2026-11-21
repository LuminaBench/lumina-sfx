import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-heavy-hatch.ts';
import source2 from './_recordings/leather-strap-flex.ts';

export default {
  id: "trunk-strut-opening",
  name: "Trunk Strut Opening",
  category: "Vehicles & Engines",
  tags: ["trunk", "strut", "opening", "vehicle"],
  loopable: false,
  durationSec: 1.3,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.1, .71, .071, 6300],
      ["brush", "air", .18, 1.03, .51, 1920, .10],
      ['clip', source2, .45, .64, .43, .05, 5180],
    ]);
  },
} satisfies SoundRecipe;
