import { mix } from '../engine/dsp.ts';
import { windBed } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';

export default {
  id: "wind-rounding-a-concrete-corner-loop",
  name: "Wind Rounding a Concrete Corner",
  category: "Weather & Ambience",
  tags: ["wind", "rounding", "concrete", "corner", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = windBed(ctx, 10.0, 4, 0.23 + params.intensity * 0.51, .46);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, .30, 2.11, 2980, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
