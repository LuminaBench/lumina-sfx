import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-diesel-bank.ts';
import loaded from './_recordings/response-diesel-loaded.ts';

export default {
  id: 'cabover-delivery-diesel-trailer-grade-pull-loop',
  name: 'Cabover delivery diesel trailer grade pull loop',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "diesel", "engine", "load", "cabover", "delivery", "trailer", "grade", "pull", "loop"],
  loopable: true,
  durationSec: 3.0,
  targetRmsDbfs: -21,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'load', {
      kind: 'diesel', pulseHz: [31, 185], timbre: 0.54, idleWindow: [0.18, 0.84], powerWindow: [0.18, 0.89],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
