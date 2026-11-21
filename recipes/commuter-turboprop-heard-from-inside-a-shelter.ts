import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-plane-overhead.ts';

export default {
  id: "commuter-turboprop-heard-from-inside-a-shelter",
  name: "Commuter Turboprop Heard from Inside a Shelter",
  category: "Aircraft",
  tags: ["commuter", "turboprop", "heard", "inside", "shelter"],
  loopable: false,
  durationSec: 5.97,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.59, 0.75, 0.15, 1632, 0.022, 0.73],
      ['clip', source, 0.068, 4.85, 0.15, 0.17, 850, 0.018, 0.82],
      ["brush", "air", 0.26, 3.95, 0.2, 338.4, 0.34],
    ]);
  },
} satisfies SoundRecipe;
