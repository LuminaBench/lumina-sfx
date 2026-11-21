import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-air.ts';

export default {
  id: "dry-stone-wall-in-farmland-loop",
  name: "Dry Stone Wall in Farmland",
  category: "Weather & Ambience",
  tags: ["dry", "stone", "wall", "farmland", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -35,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 255, edge: 1110, drift: .31, density: 2.35, material: "stone", texture: .25,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .42, 3.31, 4000, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
