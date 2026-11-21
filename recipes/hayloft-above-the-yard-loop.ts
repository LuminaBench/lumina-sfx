import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-air.ts';
import source2 from './_recordings/field-coop-room.ts';

export default {
  id: "hayloft-above-the-yard-loop",
  name: "Hayloft above the Yard",
  category: "Weather & Ambience",
  tags: ["hayloft", "above", "yard", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -34,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 200, edge: 915, drift: .25, density: 1.27, material: "wood", texture: .28,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .51, 4.24, 1510, 0, 0],
      ['clip', source2, 4.1, 9.7, .27, .83, 2300, 1.55, 2],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
