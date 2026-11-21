import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/demo-rotor-bed.ts';
import loaded from './_recordings/demo-rotor-pass.ts';

export default {
  id: 'rescue-helicopter-collective-up-to-hover',
  name: 'Rescue helicopter collective up to hover',
  category: 'Aircraft',
  tags: ["aircraft", "rotor", "engine", "roll-on", "rescue", "helicopter", "collective", "up", "to", "hover"],
  loopable: false,
  durationSec: 2.88,
  targetRmsDbfs: -22,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'roll-on', {
      kind: 'rotor', pulseHz: [13, 24], timbre: 0.61, idleWindow: [0.16, 0.71], powerWindow: [0.36, 0.94],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
