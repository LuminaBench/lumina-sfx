import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/diesel-truck-idle-loop.ts';
import loaded from './_recordings/response-truck-exterior.ts';

export default {
  id: 'long-haul-road-tractor-lift-for-descent',
  name: 'Long-haul road tractor lift for descent',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "diesel", "engine", "lift", "long", "haul", "road", "tractor", "for", "descent"],
  loopable: false,
  durationSec: 2.07,
  targetRmsDbfs: -24,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'lift', {
      kind: 'diesel', pulseHz: [33, 174], timbre: 0.45, idleWindow: [0.2, 0.91], powerWindow: [0.06, 0.89],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
