import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-sideswipe-scrape.ts';
import recording2 from './_recordings/motion-chain-scrape.ts';

export default {
  id: 'steel-guardrail-buckles-under-door-scrape', name: 'Steel guardrail buckles under door scrape', category: 'Vehicles & Engines',
  tags: ["vehicle", "steel", "guardrail", "buckles", "under", "door", "scrape", "iron", "foley"], loopable: false, durationSec: 1.17,
  mixRole: 'vehicle', targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.97, 1.0, 0.025, 7400, 0.001, 0.09],
      ['clip', recording2, 0.17, 0.94, 0.47, 0.32, 5300, 0.006, 0.09],
      ["contact", "iron", 0.35, 0.28, 0.3, 294, 0.003],
    ]);
  },
} satisfies SoundRecipe;
