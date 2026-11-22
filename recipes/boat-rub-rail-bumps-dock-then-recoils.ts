import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/milestone-oar.ts';
import recording2 from './_recordings/reviewed-motion-sailboat-cabin.ts';

export default {
  id: 'boat-rub-rail-bumps-dock-then-recoils', name: 'Boat rub rail bumps dock then recoils', category: 'Vehicles & Engines',
  tags: ["vehicle", "boat", "rub", "rail", "bumps", "dock", "then", "recoils", "rubber", "foley"], loopable: false, durationSec: 1.2,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.77, 0.84, 0.05, 5200, 0.001, 0.09],
      ['clip', recording2, 0.09, 1.05, 0.53, 0.94, 1400, 0.006, 0.09],
      ["contact", "rubber", 0.028, 0.12, 0.28, 241, 0.003],
    ]);
  },
} satisfies SoundRecipe;
