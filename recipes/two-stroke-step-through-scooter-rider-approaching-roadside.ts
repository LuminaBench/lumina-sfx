import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-moped-street.ts';
import loaded from './_recordings/response-two-stroke-roll.ts';

export default {
  id: 'two-stroke-step-through-scooter-rider-approaching-roadside',
  name: 'Two-stroke step-through scooter rider approaching roadside',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "approach", "two", "stroke", "step", "through", "scooter", "rider", "approaching", "roadside"],
  loopable: false,
  durationSec: 2.68,
  targetRmsDbfs: -24,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'approach', {
      kind: 'piston', pulseHz: [33, 156], timbre: 0.86, idleWindow: [0.12, 0.48], powerWindow: [0.26, 0.92],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
