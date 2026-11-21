import { mix } from '../engine/dsp.ts';
import { windBed } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-tent-tension.ts';

export default {
  id: "freefall-through-a-crosswind-loop",
  name: "Freefall through a Crosswind",
  category: "Weather & Ambience",
  tags: ["freefall", "crosswind", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = windBed(ctx, 9.0, 3, 0.23 + params.intensity * 0.51, .69);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 2.38, 3.0, .25, .07, 3790, .27, .49],
      ["grains", "cloth", 5.2, 3.6, .067, 770, 23],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
