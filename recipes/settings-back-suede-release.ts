import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import attack from './_recordings/isolated-response-button.ts';

export default {
  id: 'settings-back-suede-release',
  name: 'Suede release · back to parent',
  category: 'Footsteps & UI',
  tags: ["menu", "ui", "settings", "back", "return", "cancel", "submenu", "suede", "soft", "release"],
  isolation: 'isolated',
  mixRole: 'interface',
  loopable: false,
  durationSec: 0.164,
  targetRmsDbfs: -28,
  perspective: 'local interface',
  contains: ['suede brush and low release'],
  markers: { release: 0.05 },
  params: { pressure: { label: 'Finger pressure', min: 0, max: 1, default: 0.5 } },
  ...sceneCredits(attack),
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', attack, 0, 0.034, 0.47, 0, 3300, 0.0003, 0.004],
      ["brush", "cloth", 0, 0.108, 0.47, 1080, 0.003],
      ["contact", "wood", 0.05, 0.085, 0.38, 410, 0.0008],
      ["brush", "cloth", 0.069, 0.082, 0.21, 480, 0.004],
    ]);
  },
} satisfies SoundRecipe;
