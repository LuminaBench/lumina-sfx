import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-saturn-idle.ts';
import loaded from './_recordings/demo-sport-exterior.ts';

export default {
  id: 'v10-inspired-gt-grandstand-approach',
  name: 'V10-inspired GT grandstand approach',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "approach", "v10", "inspired", "gt", "grandstand"],
  loopable: false,
  durationSec: 2.79,
  targetRmsDbfs: -24,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'approach', {
      kind: 'piston', pulseHz: [69, 510], timbre: 0.91, idleWindow: [0.2, 0.78], powerWindow: [0.12, 0.83],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
