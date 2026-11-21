import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/demo-ev-surface.ts';
import loaded from './_recordings/demo-sport-exterior.ts';

export default {
  id: 'hybrid-performance-berlinetta-helmeted-cockpit-cruise-loop',
  name: 'Hybrid performance berlinetta helmeted cockpit cruise loop',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "electric", "engine", "cabin", "hybrid", "performance", "berlinetta", "helmeted", "cockpit", "cruise", "loop"],
  loopable: true,
  durationSec: 2.59,
  targetRmsDbfs: -28,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'cabin', {
      kind: 'electric', pulseHz: [83, 410], timbre: 0.72, idleWindow: [0.13, 0.74], powerWindow: [0.23, 0.82],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
