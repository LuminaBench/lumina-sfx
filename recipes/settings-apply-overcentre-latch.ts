import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import attack from './_recordings/isolated-response-rocker.ts';

export default {
  id: 'settings-apply-overcentre-latch',
  name: 'Over-centre latch · apply changes',
  category: 'Footsteps & UI',
  tags: ["menu", "ui", "settings", "apply", "commit", "save", "confirm", "changes", "firm", "latch"],
  isolation: 'isolated',
  mixRole: 'interface',
  loopable: false,
  durationSec: 0.205,
  targetRmsDbfs: -24,
  perspective: 'local interface',
  contains: ['over-centre travel and damped latch'],
  markers: { commit: 0.071 },
  params: { pressure: { label: 'Finger pressure', min: 0, max: 1, default: 0.5 } },
  ...sceneCredits(attack),
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', attack, 0, 0.034, 0.58, 0, 5800, 0.0003, 0.004],
      ["contact", "wood", 0.004, 0.058, 0.43, 780, 0.0005],
      ["brush", "rubber", 0.024, 0.047, 0.31, 640, 0.002],
      ["contact", "iron", 0.071, 0.046, 0.45, 1190, 0.0005],
      ["contact", "rubber", 0.077, 0.112, 0.75, 360, 0.0008],
    ], attack);
  },
} satisfies SoundRecipe;
