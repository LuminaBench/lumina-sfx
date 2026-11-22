import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default {
  id: 'settings-slider-knurled-index',
  name: 'Knurled dial · slider step',
  category: 'Footsteps & UI',
  tags: ["menu", "ui", "settings", "slider", "notch", "step", "dial", "index", "single", "fine", "increment"],
  isolation: 'isolated',
  mixRole: 'interface',
  loopable: false,
  durationSec: 0.049,
  targetRmsDbfs: -32,
  perspective: 'local interface',
  contains: ['single fine dial increment'],
  markers: { step: 0 },
  params: { pressure: { label: 'Finger pressure', min: 0, max: 1, default: 0.5 } },
  ...sceneCredits(attack),
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', attack, 0, 0.034, 0.62, 0, 4200, 0.0003, 0.004],
      ["contact", "iron", 0.001, 0.031, 0.43, 1430, 0.0005],
      ["contact", "rubber", 0.005, 0.036, 0.46, 600, 0.0006],
    ], attack);
  },
} satisfies SoundRecipe;
