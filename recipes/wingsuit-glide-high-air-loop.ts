import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';
import source2 from './_recordings/demo-canopy-rustle.ts';

export default {
  id: "wingsuit-glide-high-air-loop",
  name: "Wingsuit Glide High Air",
  category: "Weather & Ambience",
  tags: ["wingsuit", "glide", "high", "air", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 278, edge: 3280, drift: .23, density: 2.9, material: "air", texture: .36,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .61, 2.29, 6800, 0, 0],
      ['clip', source2, 3.47, 4.0, .095, .15, 6900, .55, .73],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
