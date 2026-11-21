import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-outboard-aeration.ts';
import loaded from './_recordings/motion-flatboat-throttle.ts';

export default {
  id: 'twin-outboard-speedboat-planing-throttle-loop',
  name: 'Twin-outboard speedboat planing throttle loop',
  category: 'Vehicles & Engines',
  tags: ["boat", "outboard", "engine", "load", "twin", "speedboat", "planing", "throttle", "loop"],
  loopable: true,
  durationSec: 3.26,
  targetRmsDbfs: -21,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'load', {
      kind: 'outboard', pulseHz: [52, 273], timbre: 0.81, idleWindow: [0.19, 0.89], powerWindow: [0.31, 0.91],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
