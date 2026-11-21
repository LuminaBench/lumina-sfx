import { mix } from '../engine/dsp.ts';
import { windBed } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-flag-rush.ts';
import source2 from './_recordings/demo-canopy-rustle.ts';

export default {
  id: "freefall-wind-close-loop",
  name: "Freefall Wind Close",
  category: "Weather & Ambience",
  tags: ["freefall", "wind", "close", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = windBed(ctx, 9.0, 8, 0.23 + params.intensity * 0.51, .78);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 1.85, 3.1, .17, 0, 4100, .24, .42],
      ['clip', source2, 5.55, 3.23, .16, .54, 3980, .32, .41],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
