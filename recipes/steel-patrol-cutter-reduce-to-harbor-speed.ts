import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-marine-engine.ts';
import loaded from './_recordings/response-diesel-loaded.ts';

export default {
  id: 'steel-patrol-cutter-reduce-to-harbor-speed',
  name: 'Steel patrol cutter reduce to harbor speed',
  category: 'Vehicles & Engines',
  tags: ["boat", "diesel", "engine", "lift", "steel", "patrol", "cutter", "reduce", "to", "harbor", "speed"],
  loopable: false,
  durationSec: 1.68,
  targetRmsDbfs: -24,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'lift', {
      kind: 'diesel', pulseHz: [28, 113], timbre: 0.51, idleWindow: [0.21, 0.92], powerWindow: [0.15, 0.84],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
