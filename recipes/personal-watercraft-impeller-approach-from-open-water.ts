import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-jet-water-retreat.ts';
import loaded from './_recordings/motion-jet-water-approach.ts';

export default {
  id: 'personal-watercraft-impeller-approach-from-open-water',
  name: 'Personal watercraft impeller approach from open water',
  category: 'Vehicles & Engines',
  tags: ["boat", "outboard", "engine", "approach", "personal", "watercraft", "impeller", "from", "open", "water"],
  loopable: false,
  durationSec: 3.81,
  targetRmsDbfs: -24,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'approach', {
      kind: 'outboard', pulseHz: [64, 319], timbre: 0.83, idleWindow: [0.34, 0.89], powerWindow: [0.21, 0.88],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
