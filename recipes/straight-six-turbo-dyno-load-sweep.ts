import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/car-cabin-idle-loop.ts';
import loaded from './_recordings/motion-straight-six-pull.ts';

export default {
  id: "straight-six-turbo-dyno-load-sweep",
  name: "Straight-six turbo dyno load sweep",
  category: "Vehicles & Engines",
  tags: ["straight", "six", "turbo", "dyno", "load", "sweep", "car", "engine", "vehicle"],
  loopable: false,
  durationSec: 3.72,
  targetRmsDbfs: -23.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(idle, loaded),
  render(ctx, { params, seed }) {
    return propulsion(ctx, seed, params.intensity, .50, 'roll-on', {
      kind: 'piston', pulseHz: [42, 315], timbre: .86, idleWindow: [.18, .88], powerWindow: [.12, .91],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
