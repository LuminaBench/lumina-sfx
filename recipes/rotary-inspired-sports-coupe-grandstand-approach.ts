import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/car-cabin-idle-loop.ts';
import loaded from './_recordings/demo-sport-exterior.ts';

export default {
  id: 'rotary-inspired-sports-coupe-grandstand-approach',
  name: 'Rotary-inspired sports coupe grandstand approach',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "approach", "rotary", "inspired", "sports", "coupe", "grandstand"],
  loopable: false,
  durationSec: 2.82,
  targetRmsDbfs: -24,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'approach', {
      kind: 'piston', pulseHz: [62, 397], timbre: 0.92, idleWindow: [0.27, 0.86], powerWindow: [0.3, 0.91],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
