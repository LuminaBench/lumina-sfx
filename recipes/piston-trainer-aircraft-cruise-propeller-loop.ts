import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-cessna-taxi.ts';
import loaded from './_recordings/milestone-prop-pass.ts';

export default {
  id: 'piston-trainer-aircraft-cruise-propeller-loop',
  name: 'Piston trainer aircraft cruise propeller loop',
  category: 'Aircraft',
  tags: ["aircraft", "prop", "engine", "cruise", "piston", "trainer", "propeller", "loop"],
  loopable: true,
  durationSec: 3.69,
  targetRmsDbfs: -24,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'cruise', {
      kind: 'prop', pulseHz: [28, 88], timbre: 0.72, idleWindow: [0.24, 0.92], powerWindow: [0.15, 0.86],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
