import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import attack from './_recordings/isolated-response-button.ts';

export default {
  id: 'settings-list-edge-felt-bumper',
  name: 'Felt bumper · end of list',
  category: 'Footsteps & UI',
  tags: ["menu", "ui", "settings", "list", "boundary", "limit", "end", "blocked", "soft", "stop"],
  isolation: 'isolated',
  mixRole: 'interface',
  loopable: false,
  durationSec: 0.143,
  targetRmsDbfs: -29,
  perspective: 'local interface',
  contains: ['damped double bumper contact'],
  markers: { stop: 0.059 },
  params: { pressure: { label: 'Finger pressure', min: 0, max: 1, default: 0.5 } },
  ...sceneCredits(attack),
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', attack, 0, 0.034, 0.36, 0, 1900, 0.0003, 0.004],
      ["contact", "rubber", 0, 0.062, 0.72, 500, 0.0006],
      ["contact", "rubber", 0.059, 0.074, 0.32, 310, 0.0014],
    ], attack);
  },
} satisfies SoundRecipe;
