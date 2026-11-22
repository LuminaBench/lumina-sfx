import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-marine-engine.ts';
import loaded from './_recordings/motion-outboard-aeration.ts';

export default {
  perspective: "above water", contains: ["steady motor heard offshore"], markers: {"handoff": 1.48},
  id: "working-motorboat-steady-offshore-loop",
  name: "Working motorboat steady offshore loop",
  category: "Water & Fire",
  tags: ["working", "motorboat", "steady", "offshore", "boat", "marine"],
  loopable: true,
  durationSec: 6.25,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(idle, loaded),
  render(ctx, { params, seed }) {
    return propulsion(ctx, seed, params.intensity, .50, 'cruise', {
      kind: 'outboard', pulseHz: [27, 135], timbre: .53, idleWindow: [.10, .90], powerWindow: [.28, .81],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
