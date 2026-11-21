import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/water-drops-from-spout.ts';

export default {
  id: "melting-ice-from-eaves-loop",
  name: "Melting Ice from Eaves",
  category: "Weather & Ambience",
  tags: ["melting", "ice", "eaves", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -33,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 400, edge: 1670, drift: .14, density: 4.2, material: "water", texture: .32,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .61, .86, .28, 0, 6500, .06, .17],
      ['clip', source, 3.19, .80, .22, .073, 8200, .075, .13],
      ['clip', source, 6.31, .83, .24, .046, 8900, .065, .15],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
