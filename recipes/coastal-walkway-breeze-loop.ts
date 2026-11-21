import { mix } from '../engine/dsp.ts';
import { windBed } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';
import source2 from './_recordings/field-brook-bed.ts';

export default {
  id: "coastal-walkway-breeze-loop",
  name: "Coastal Walkway Breeze",
  category: "Weather & Ambience",
  tags: ["coastal", "walkway", "breeze", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -33,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = windBed(ctx, 10.0, 3, 0.23 + params.intensity * 0.51, .35);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, .46, 4.12, 5000, 0, 0],
      ['clip', source2, 0, 10.075, .14, 2.71, 3800, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
