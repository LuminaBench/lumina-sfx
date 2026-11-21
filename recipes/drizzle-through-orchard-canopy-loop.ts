import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-leaf-bed.ts';

export default {
  id: "drizzle-through-orchard-canopy-loop",
  name: "Drizzle through Orchard Canopy",
  category: "Weather & Ambience",
  tags: ["drizzle", "orchard", "canopy", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "leaves", duration: 9.0, force: params.intensity, density: .31, pace: 3 });
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .12, .26, 6300, 0, 0],
      ["grains", "water", .29, 8.45, .08, 475, 51],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
