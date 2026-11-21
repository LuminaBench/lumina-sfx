import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "biometric-access-transient",
  name: "Biometric Access Transient",
  category: "Sci-Fi & UI",
  tags: ["biometric", "access", "transient"],
  loopable: false,
  durationSec: 0.65,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, .15, .62, 360, .002],
      ["brush", "air", .053, .34, .42, 2460, .036],
      ["tone", .214, .32, .48, 641, 714, .032, .41],
    ]);
  },
} satisfies SoundRecipe;
