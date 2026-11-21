import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-bow.ts';
import source2 from './_recordings/slatted-crate-settle.ts';

export default {
  id: "wooden-dinghy-at-a-dock-waterline-loop",
  name: "Wooden Dinghy at a Dock Waterline",
  category: "Water & Fire",
  tags: ["wooden", "dinghy", "dock", "waterline"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 283.24, edge: 1792, drift: 0.25, density: 9, material: "water", texture: 0.42,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, 0.56, 0.8, 2520, 0, 0],
      ['clip', source2, 3.1, 2.3, 0.11, 0.09, 2044, 0.49, 0.8],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
