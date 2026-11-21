import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-coop-room.ts';
import source2 from './_recordings/field-hen-scratch.ts';

export default {
  id: "quiet-poultry-shed-at-dusk-loop",
  name: "Quiet Poultry Shed at Dusk",
  category: "Weather & Ambience",
  tags: ["quiet", "poultry", "shed", "dusk", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -33,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 240, edge: 1030, drift: .11, density: 1.43, material: "cloth", texture: .30,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 1.1, 11.8, .52, 1.0, 2680, 1.7, 2],
      ['clip', source2, 9.2, .96, .069, .058, 3300, .19, .37],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
