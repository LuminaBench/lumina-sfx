import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import attack from './_recordings/isolated-response-rocker.ts';

export default {
  id: 'settings-toggle-off-cork',
  name: 'Cork stop · toggle off',
  category: 'Footsteps & UI',
  tags: ["menu", "ui", "settings", "toggle", "off", "disable", "switch", "cork", "muted"],
  isolation: 'isolated',
  mixRole: 'interface',
  loopable: false,
  durationSec: 0.12,
  targetRmsDbfs: -28,
  perspective: 'local interface',
  contains: ['muted rocker and cork seat'],
  markers: { seat: 0.041 },
  params: { pressure: { label: 'Finger pressure', min: 0, max: 1, default: 0.5 } },
  ...sceneCredits(attack),
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', attack, 0, 0.034, 0.49, 0, 3800, 0.0003, 0.004],
      ["brush", "cloth", 0.003, 0.035, 0.33, 890, 0.001],
      ["contact", "wood", 0.017, 0.045, 0.36, 800, 0.0007],
      ["contact", "rubber", 0.041, 0.072, 0.58, 370, 0.001],
    ], attack);
  },
} satisfies SoundRecipe;
