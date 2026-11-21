import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/diesel-truck-idle-loop.ts';
import loaded from './_recordings/response-truck-exterior.ts';

export default {
  id: 'long-haul-road-tractor-two-low-gear-pulls',
  name: 'Long-haul road tractor two low gear pulls',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "diesel", "engine", "surge", "long", "haul", "road", "tractor", "two", "low", "gear", "pulls"],
  loopable: false,
  durationSec: 2.86,
  targetRmsDbfs: -23,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'surge', {
      kind: 'diesel', pulseHz: [33, 174], timbre: 0.45, idleWindow: [0.2, 0.91], powerWindow: [0.06, 0.89],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
