import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-marine-engine.ts';
import loaded from './_recordings/response-diesel-loaded.ts';

export default {
  id: 'steel-patrol-cutter-ring-up-full-ahead',
  name: 'Steel patrol cutter ring up full ahead',
  category: 'Vehicles & Engines',
  tags: ["boat", "diesel", "engine", "roll-on", "steel", "patrol", "cutter", "ring", "up", "full", "ahead"],
  loopable: false,
  durationSec: 2.13,
  targetRmsDbfs: -22,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'roll-on', {
      kind: 'diesel', pulseHz: [28, 113], timbre: 0.51, idleWindow: [0.21, 0.92], powerWindow: [0.15, 0.84],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
