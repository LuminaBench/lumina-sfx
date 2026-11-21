import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-stalk-bed.ts';
import source2 from './_recordings/field-bird-flutter.ts';

export default {
  id: "autumn-berry-hedge-loop",
  name: "Autumn Berry Hedge",
  category: "Weather & Ambience",
  tags: ["autumn", "berry", "hedge", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 490, edge: 2230, drift: .32, density: 4.6, material: "plant", texture: .54,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .69, 2.4, 6800, 0, 0],
      ['clip', source2, 6.89, .74, .1, 0, 5890, .045, .17],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
