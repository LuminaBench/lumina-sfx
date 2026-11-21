import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/car-engine-idle-loop.ts';
import loaded from './_recordings/car-engine-throttle-blip.ts';

export default {
  id: 'commuter-sedan-traffic-light-pullaway',
  name: 'Commuter sedan traffic light pullaway',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "roll-on", "commuter", "sedan", "traffic", "light", "pullaway"],
  loopable: false,
  durationSec: 2.18,
  targetRmsDbfs: -22,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'roll-on', {
      kind: 'piston', pulseHz: [29, 176], timbre: 0.46, idleWindow: [0.13, 0.92], powerWindow: [0.11, 0.84],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
