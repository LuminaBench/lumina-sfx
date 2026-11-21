import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "rain-on-plastic-row-cover-loop",
  name: "Rain on Plastic Row Cover",
  category: "Weather & Ambience",
  tags: ["rain", "plastic", "row", "cover", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "open", duration: 9.0, force: params.intensity, density: .51, pace: 3 });
    const detail = scene(ctx, seed, params.intensity, [
      ["grains", "rubber", .02, 8.8, .26, 335, 104],
      ['clip', source, 5.04, .57, .043, .07, 5100, .04, .20],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
