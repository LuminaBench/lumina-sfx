import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/demo-airliner-approach.ts';
import loaded from './_recordings/demo-jet-takeoff.ts';

export default {
  id: 'passenger-turbofan-runway-power-set',
  name: 'Passenger turbofan runway power set',
  category: 'Aircraft',
  tags: ["aircraft", "jet", "engine", "roll-on", "passenger", "turbofan", "runway", "power", "set"],
  loopable: false,
  durationSec: 3.19,
  targetRmsDbfs: -22,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'roll-on', {
      kind: 'jet', pulseHz: [105, 460], timbre: 0.59, idleWindow: [0.1, 0.55], powerWindow: [0.26, 0.88],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
