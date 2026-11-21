import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-marsh.ts';
import source2 from './_recordings/field-bird-canopy.ts';

export default {
  id: "distant-marsh-birds-at-dusk-loop",
  name: "Distant Marsh Birds at Dusk",
  category: "Weather & Ambience",
  tags: ["distant", "marsh", "birds", "dusk", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -33,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 278, edge: 1430, drift: .17, density: 1.5, material: "air", texture: .22,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .61, .41, 4970, 0, 0],
      ['clip', source2, 2.54, 11.15, .22, 2.02, 2980, 1.27, 1.85],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
