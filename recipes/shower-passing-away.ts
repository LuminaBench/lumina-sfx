import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/water-drops-from-spout.ts';

export default {
  id: "shower-passing-away",
  name: "Shower Passing Away",
  category: "Weather & Ambience",
  tags: ["shower", "passing", "away", "ambience"],
  loopable: false,
  durationSec: 3.5,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "open", duration: 3.5, force: params.intensity, density: .52, pace: 2 });
    for (let i = 0; i < bed.length; i++) {
      const fraction = i / bed.length;
      bed[i] *= 0.10 + 0.90 * (1 - fraction) ** 2;
    }
    const detail = scene(ctx, seed, params.intensity, [
      ["grains", "water", 1.7, 1.6, .17, 740, 13],
      ['clip', source, 2.64, .76, .20, 0, 9400],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
