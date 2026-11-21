import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-chain-link.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "heavy-guard-armor-plates-crouch-and-rise",
  name: "Heavy guard armor plates crouch and rise",
  category: "Weapons",
  tags: ["heavy", "guard", "armor", "plates", "crouch", "rise"],
  loopable: false,
  durationSec: 1.42,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.34, .39, .64, 5790, .008, .15],
      ['clip', source2, 0, 1.39, .49, .05, 2900, .005, .18],
      ["contact", "iron", 0, .093, .53, 251, .0018],
      ["contact", "iron", .28, .14, .41, 379, .002],
      ["contact", "iron", 1.03, .19, .53, 299, .0024],
    ]);
  },
} satisfies SoundRecipe;
