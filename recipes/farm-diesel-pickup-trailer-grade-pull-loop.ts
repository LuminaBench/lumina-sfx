import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-diesel-hood.ts';
import loaded from './_recordings/motion-truck-load.ts';

export default {
  id: 'farm-diesel-pickup-trailer-grade-pull-loop',
  name: 'Farm diesel pickup trailer grade pull loop',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "diesel", "engine", "load", "farm", "pickup", "trailer", "grade", "pull", "loop"],
  loopable: true,
  durationSec: 3.03,
  targetRmsDbfs: -21,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'load', {
      kind: 'diesel', pulseHz: [36, 222], timbre: 0.63, idleWindow: [0.11, 0.75], powerWindow: [0.17, 0.91],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
