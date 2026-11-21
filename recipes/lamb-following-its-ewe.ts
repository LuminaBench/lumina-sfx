import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-lamb-call.ts';
import source2 from './_recordings/sheep-bleat.ts';

export default {
  id: "lamb-following-its-ewe",
  name: "Lamb Following Its Ewe",
  category: "Animals",
  tags: ["lamb", "following", "ewe", "livestock"],
  loopable: false,
  durationSec: 1.7,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.04, .88, .009, 11300],
      ['clip', source2, .59, .94, .29, .03, 7000, .025, .15],
    ]);
  },
} satisfies SoundRecipe;
