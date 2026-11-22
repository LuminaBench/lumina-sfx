import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import attack from './_recordings/isolated-physical-light-switch.ts';

export default {
  id: 'settings-toggle-engage-brass',
  name: 'Brass rocker · toggle on',
  category: 'Footsteps & UI',
  tags: ["menu", "ui", "settings", "toggle", "on", "enable", "switch", "brass", "snap"],
  isolation: 'isolated',
  mixRole: 'interface',
  loopable: false,
  durationSec: 0.123,
  targetRmsDbfs: -26,
  perspective: 'local interface',
  contains: ['rocker travel and brass snap'],
  markers: { seat: 0.033 },
  params: { pressure: { label: 'Finger pressure', min: 0, max: 1, default: 0.5 } },
  ...sceneCredits(attack),
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', attack, 0, 0.034, 0.71, 0, 7100, 0.0003, 0.004],
      ["contact", "rubber", 0.002, 0.049, 0.42, 490, 0.0007],
      ["contact", "iron", 0.033, 0.083, 0.57, 1290, 0.0005],
    ], attack);
  },
} satisfies SoundRecipe;
