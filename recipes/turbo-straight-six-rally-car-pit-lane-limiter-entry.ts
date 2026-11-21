import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/car-cabin-idle-loop.ts';
import loaded from './_recordings/motion-straight-six-pull.ts';

export default {
  id: 'turbo-straight-six-rally-car-pit-lane-limiter-entry',
  name: 'Turbo straight-six rally car pit lane limiter entry',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "settle", "turbo", "straight", "six", "rally", "car", "pit", "lane", "limiter", "entry"],
  loopable: false,
  durationSec: 2.38,
  targetRmsDbfs: -25,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'settle', {
      kind: 'piston', pulseHz: [49, 355], timbre: 0.85, idleWindow: [0.18, 0.86], powerWindow: [0.24, 0.95],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
