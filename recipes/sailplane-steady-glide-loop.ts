import { mix } from '../engine/dsp.ts';
import { windBed } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';

export default {
  id: "sailplane-steady-glide-loop",
  name: "Sailplane Steady Glide",
  category: "Aircraft",
  tags: ["sailplane", "steady", "glide"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = windBed(ctx, 9.0, 3, 0.23 + params.intensity * 0.51, 0.48);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, 0.32, 2.04, 6000, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
