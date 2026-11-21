import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/response-prop-cabin.ts';
import loaded from './_recordings/motion-turbo-prop-cabin.ts';

export default {
  id: 'commuter-turboprop-apron-idle-loop',
  name: 'Commuter turboprop apron idle loop',
  category: 'Aircraft',
  tags: ["aircraft", "prop", "engine", "idle", "commuter", "turboprop", "apron", "loop"],
  loopable: true,
  durationSec: 2.77,
  targetRmsDbfs: -25,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'idle', {
      kind: 'prop', pulseHz: [41, 135], timbre: 0.68, idleWindow: [0.14, 0.87], powerWindow: [0.29, 0.95],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
