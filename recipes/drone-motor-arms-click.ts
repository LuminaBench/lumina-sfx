import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-camera.ts';

export default {
  id: "drone-motor-arms-click",
  name: "Drone Motor Arms Click",
  category: "Aircraft",
  tags: ["drone", "motor", "arms", "click"],
  loopable: false,
  durationSec: 0.76,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, .13, .55, 561, .001],
      ['clip', source, .029, .28, .53, .011, 7300],
      ["motor", .12, .29, .19, 215, 182, .039, .42],
      ["contact", "iron", .31, .17, .36, 859, .001],
    ]);
  },
} satisfies SoundRecipe;
