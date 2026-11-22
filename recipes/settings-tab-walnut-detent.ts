import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import attack from './_recordings/isolated-response-rocker.ts';

export default {
  id: 'settings-tab-walnut-detent',
  name: 'Walnut detent · switch settings tab',
  category: 'Footsteps & UI',
  tags: ["menu", "ui", "settings", "tabs", "switch", "selection", "click", "wood", "warm", "tactile"],
  isolation: 'isolated',
  mixRole: 'interface',
  loopable: false,
  durationSec: 0.137,
  targetRmsDbfs: -26,
  perspective: 'local interface',
  contains: ['walnut contact and cushioned detent'],
  markers: { seat: 0.028 },
  params: { pressure: { label: 'Finger pressure', min: 0, max: 1, default: 0.5 } },
  ...sceneCredits(attack),
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', attack, 0, 0.034, 0.77, 0, 6800, 0.0003, 0.004],
      ["contact", "wood", 0.004, 0.091, 0.63, 690, 0.0005],
      ["contact", "rubber", 0.028, 0.099, 0.39, 310, 0.001],
    ], attack);
  },
} satisfies SoundRecipe;
