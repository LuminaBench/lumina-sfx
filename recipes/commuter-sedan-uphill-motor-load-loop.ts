import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/car-engine-idle-loop.ts';
import loaded from './_recordings/car-engine-throttle-blip.ts';

export default {
  id: 'commuter-sedan-uphill-motor-load-loop',
  name: 'Commuter sedan uphill motor load loop',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "load", "commuter", "sedan", "uphill", "motor", "loop"],
  loopable: true,
  durationSec: 2.55,
  targetRmsDbfs: -21,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'load', {
      kind: 'piston', pulseHz: [29, 176], timbre: 0.46, idleWindow: [0.13, 0.92], powerWindow: [0.11, 0.84],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
