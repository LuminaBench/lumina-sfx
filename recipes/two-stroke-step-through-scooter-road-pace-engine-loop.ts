import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-moped-street.ts';
import loaded from './_recordings/response-two-stroke-roll.ts';

export default {
  id: 'two-stroke-step-through-scooter-road-pace-engine-loop',
  name: 'Two-stroke step-through scooter road pace engine loop',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "cruise", "two", "stroke", "step", "through", "scooter", "road", "pace", "loop"],
  loopable: true,
  durationSec: 2.78,
  targetRmsDbfs: -24,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'cruise', {
      kind: 'piston', pulseHz: [33, 156], timbre: 0.86, idleWindow: [0.12, 0.48], powerWindow: [0.26, 0.92],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
