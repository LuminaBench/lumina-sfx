import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-bow.ts';
import source2 from './_recordings/slatted-crate-settle.ts';

export default {
  id: "ferry-landing-at-a-slip-waterline-loop",
  name: "Ferry Landing at a Slip Waterline",
  category: "Water & Fire",
  tags: ["ferry", "landing", "slip", "waterline"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 159.14, edge: 1728, drift: 0.25, density: 9, material: "water", texture: 0.42,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, 0.56, 0.8, 2430, 0, 0],
      ['clip', source2, 3.1, 2.3, 0.11, 0.09, 1971, 0.49, 0.8],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
