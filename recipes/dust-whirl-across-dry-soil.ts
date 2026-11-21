import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/shake-soil-off-roots.ts';

export default {
  id: "dust-whirl-across-dry-soil",
  name: "Dust Whirl across Dry Soil",
  category: "Weather & Ambience",
  tags: ["dust", "whirl", "across", "dry", "soil", "ambience"],
  loopable: false,
  durationSec: 1.57,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 1.2, .72, 665, .031],
      ['clip', source, .19, .68, .37, .084, 7100],
      ["brush", "soil", .46, .99, .36, 420, .12],
      ["grains", "soil", .73, .63, .27, 1000, 22],
    ]);
  },
} satisfies SoundRecipe;
