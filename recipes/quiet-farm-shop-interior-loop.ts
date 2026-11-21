import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-air.ts';
import source2 from './_recordings/wooden-drawer-shut.ts';
import source3 from './_recordings/wooden-chest-shut.ts';

export default {
  id: "quiet-farm-shop-interior-loop",
  name: "Quiet Farm Shop Interior",
  category: "Weather & Ambience",
  tags: ["quiet", "farm", "shop", "interior", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -35,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 160, edge: 1340, drift: .11, density: 1.8, material: "wood", texture: .29,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .39, .07, 1520, 0, 0],
      ['clip', source2, 5.7, .60, .068, .08, 2470, .075, .22],
      ['clip', source3, 10.73, .59, .06, .06, 2840, .1, .16],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
