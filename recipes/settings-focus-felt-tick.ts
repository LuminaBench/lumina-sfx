import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default {
  id: 'settings-focus-felt-tick',
  name: 'Felt tick · settings focus',
  category: 'Footsteps & UI',
  tags: ["menu", "ui", "focus", "hover", "navigation", "quiet", "rapid", "scroll", "felt", "tick"],
  isolation: 'isolated',
  mixRole: 'interface',
  loopable: false,
  durationSec: 0.059,
  targetRmsDbfs: -32,
  perspective: 'local interface',
  contains: ['felt-lined focus tick'],
  markers: { focus: 0 },
  params: { pressure: { label: 'Finger pressure', min: 0, max: 1, default: 0.5 } },
  ...sceneCredits(attack),
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', attack, 0, 0.034, 0.52, 0, 3900, 0.0003, 0.004],
      ["brush", "cloth", 0, 0.052, 0.4, 730, 0.001],
      ["contact", "rubber", 0.008, 0.043, 0.38, 490, 0.0006],
    ], attack);
  },
} satisfies SoundRecipe;
