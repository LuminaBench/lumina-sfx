import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-moped-street.ts';
import loaded from './_recordings/response-two-stroke-roll.ts';

export default {
  id: 'two-stroke-step-through-scooter-helmet-muffled-ride-loop',
  name: 'Two-stroke step-through scooter helmet muffled ride loop',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "cabin", "two", "stroke", "step", "through", "scooter", "helmet", "muffled", "ride", "loop"],
  loopable: true,
  durationSec: 2.49,
  targetRmsDbfs: -28,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'cabin', {
      kind: 'piston', pulseHz: [33, 156], timbre: 0.86, idleWindow: [0.12, 0.48], powerWindow: [0.26, 0.92],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
