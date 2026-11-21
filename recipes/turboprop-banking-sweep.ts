import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-plane-overhead.ts';

export default {
  id: "turboprop-banking-sweep",
  name: "Turboprop Banking Sweep",
  category: "Aircraft",
  tags: ["turboprop", "banking", "sweep"],
  loopable: false,
  durationSec: 4.8,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.6, .47, .88, 5000, .031, .85],
      ["motor", .04, 4.55, .28, 228, 121, .38, .57],
      ["brush", "air", .22, 3.97, .28, 1520, .45],
    ]);
  },
} satisfies SoundRecipe;
