import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-outboard-aeration.ts';
import source2 from './_recordings/milestone-smallwater.ts';

export default {
  id: "outboard-aerated-wake-layer-loop",
  name: "Outboard aerated wake layer loop",
  category: "Water & Fire",
  tags: ["outboard", "aerated", "wake", "layer", "boat", "marine"],
  loopable: true,
  durationSec: 4.6,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 182, edge: 3420, drift: .46, density: 23, material: "water", texture: .61,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.72, .41, .73, 3650, 0, 0],
      ['clip', source2, 0, 4.6, .40, .31, 7900, .07, .22],
      ["grains", "water", .1, 4.35, .16, 790, 41],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
