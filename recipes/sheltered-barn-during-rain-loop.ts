import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-air.ts';
import source2 from './_recordings/wet-crop-brush.ts';

export default {
  id: "sheltered-barn-during-rain-loop",
  name: "Sheltered Barn during Rain",
  category: "Weather & Ambience",
  tags: ["sheltered", "barn", "rain", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "roof", duration: 14.0, force: params.intensity, density: .42, pace: 1 });
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .29, 2.22, 1680, 0, 0],
      ['clip', source2, 5.37, .66, .05, 0, 5300, .05, .15],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
