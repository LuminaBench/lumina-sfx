import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/car-cabin-idle-loop.ts';
import loaded from './_recordings/motion-straight-six-pull.ts';

export default {
  id: 'v12-inspired-touring-coupe-back-straight-partial-throttle-loop',
  name: 'V12-inspired touring coupe back straight partial throttle loop',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "cruise", "v12", "inspired", "touring", "coupe", "back", "straight", "partial", "throttle", "loop"],
  loopable: true,
  durationSec: 2.92,
  targetRmsDbfs: -24,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'cruise', {
      kind: 'piston', pulseHz: [76, 625], timbre: 0.8, idleWindow: [0.15, 0.91], powerWindow: [0.14, 0.89],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
