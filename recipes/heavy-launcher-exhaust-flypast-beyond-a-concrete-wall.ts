import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/demo-turbine-ignition.ts';
import wash from './_recordings/atlas-firecracker.ts';
import detail from './_recordings/response-air-pressure.ts';

export default {
  id: "heavy-launcher-exhaust-flypast-beyond-a-concrete-wall", name: "Heavy launcher exhaust — flypast beyond a concrete wall", category: "Missiles",
  tags: ["flyby", "cinematic", "flight", "heavy", "launcher", "exhaust", "screened", "field-foley"], loopable: false, durationSec: 1.94,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "pass", trajectory: "pass", space: "screened", at: [0], color: 2449, mass: 0.92, edge: 0.65, scatter: 1, panDepth: 0.58,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
