import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-diesel-bank.ts';
import loaded from './_recordings/response-diesel-loaded.ts';

export default {
  id: 'cabover-delivery-diesel-two-low-gear-pulls',
  name: 'Cabover delivery diesel two low gear pulls',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "diesel", "engine", "surge", "cabover", "delivery", "two", "low", "gear", "pulls"],
  loopable: false,
  durationSec: 2.8,
  targetRmsDbfs: -23,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'surge', {
      kind: 'diesel', pulseHz: [31, 185], timbre: 0.54, idleWindow: [0.18, 0.84], powerWindow: [0.18, 0.89],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
