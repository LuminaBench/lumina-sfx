import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-cow-chew.ts';
import source2 from './_recordings/field-pig-snuffle.ts';
import source3 from './_recordings/field-cow-feeding.ts';
import source4 from './_recordings/field-stalk-bed.ts';

export default {
  id: "stable-after-evening-feed-loop",
  name: "Stable after Evening Feed",
  category: "Weather & Ambience",
  tags: ["stable", "evening", "feed", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3, source4),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 210, edge: 1120, drift: .16, density: 1.10, material: "cloth", texture: .29,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 1.10, 1.36, .16, .03, 3600, .16, .25],
      ['clip', source2, 4.85, .81, .15, .08, 2780, .12, .26],
      ['clip', source3, 7.85, 1.64, .14, .13, 3590, .22, .41],
      ['clip', source4, 0, 14.075, .3, .42, 5600, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
