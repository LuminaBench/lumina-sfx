import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/tractor-diesel-idle-loop.ts';
import loaded from './_recordings/tractor-diesel-pullaway.ts';

export default {
  id: 'orchard-tractor-tractor-receding-across-field',
  name: 'Orchard tractor tractor receding across field',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "diesel", "engine", "depart", "orchard", "tractor", "receding", "across", "field"],
  loopable: false,
  durationSec: 3.16,
  targetRmsDbfs: -23,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'depart', {
      kind: 'diesel', pulseHz: [22, 115], timbre: 0.53, idleWindow: [0.12, 0.88], powerWindow: [0.16, 0.85],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
