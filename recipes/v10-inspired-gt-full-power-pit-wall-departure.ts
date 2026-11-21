import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-saturn-idle.ts';
import loaded from './_recordings/demo-sport-exterior.ts';

export default {
  id: 'v10-inspired-gt-full-power-pit-wall-departure',
  name: 'V10-inspired GT full power pit wall departure',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "depart", "v10", "inspired", "gt", "full", "power", "pit", "wall", "departure"],
  loopable: false,
  durationSec: 2.57,
  targetRmsDbfs: -23,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'depart', {
      kind: 'piston', pulseHz: [69, 510], timbre: 0.91, idleWindow: [0.2, 0.78], powerWindow: [0.12, 0.83],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
