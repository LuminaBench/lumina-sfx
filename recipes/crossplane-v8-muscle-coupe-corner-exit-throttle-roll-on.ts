import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-saturn-idle.ts';
import loaded from './_recordings/demo-sport-v8.ts';

export default {
  id: 'crossplane-v8-muscle-coupe-corner-exit-throttle-roll-on',
  name: 'Crossplane V8 muscle coupe corner exit throttle roll-on',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "roll-on", "crossplane", "v8", "muscle", "coupe", "corner", "exit", "throttle", "roll", "on"],
  loopable: false,
  durationSec: 2.11,
  targetRmsDbfs: -22,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'roll-on', {
      kind: 'piston', pulseHz: [46, 335], timbre: 0.74, idleWindow: [0.25, 0.94], powerWindow: [0.12, 0.88],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
