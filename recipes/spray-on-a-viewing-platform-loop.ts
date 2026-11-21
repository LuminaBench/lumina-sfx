import { mix } from '../engine/dsp.ts';
import { windBed } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-brook-bed.ts';

export default {
  id: "spray-on-a-viewing-platform-loop",
  name: "Spray on a Viewing Platform",
  category: "Weather & Ambience",
  tags: ["spray", "viewing", "platform", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -33,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = windBed(ctx, 10.0, 3, 0.23 + params.intensity * 0.51, .42);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, .29, 1.72, 4600, 0, 0],
      ["grains", "water", .1, 9.5, .072, 747, 55],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
