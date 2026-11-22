import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default {
  id: 'settings-subtab-porcelain-tip',
  name: 'Porcelain tip · select subtab',
  category: 'Footsteps & UI',
  tags: ["menu", "ui", "settings", "subtab", "tab", "select", "precision", "ceramic", "click", "crisp"],
  isolation: 'isolated',
  mixRole: 'interface',
  loopable: false,
  durationSec: 0.098,
  targetRmsDbfs: -28,
  perspective: 'local interface',
  contains: ['porcelain tip and stone seat'],
  markers: { seat: 0.014 },
  params: { pressure: { label: 'Finger pressure', min: 0, max: 1, default: 0.5 } },
  ...sceneCredits(attack),
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', attack, 0, 0.034, 0.52, 0, 8000, 0.0003, 0.004],
      ["contact", "glass", 0.002, 0.055, 0.52, 1780, 0.0004],
      ["contact", "stone", 0.014, 0.072, 0.45, 830, 0.001],
    ]);
  },
} satisfies SoundRecipe;
