import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/key-turn-in-lock.ts';

export default {
  id: 'harbor-helm-station-focus', name: 'Harbor helm station focus', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "harbor", "helm", "station", "focus", "hover", "wood"], loopable: false, durationSec: 0.09,
  mixRole: 'interface', targetRmsDbfs: -26,
  ...sceneCredits(contact0),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact0, 0.0000, 0.054, 0.75, 0, 10500, 0.0004, 0.012],
      ['brush', 'wood', 0.008, 0.038, 0.075, 1311, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
