import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-stalk-bed.ts';

export default {
  id: "light-rain-on-dry-straw-loop",
  name: "Light Rain on Dry Straw",
  category: "Weather & Ambience",
  tags: ["light", "rain", "dry", "straw", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "leaves", duration: 9.0, force: params.intensity, density: .19, pace: 1 });
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .22, 1, 3400, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
