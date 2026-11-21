import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import milestoneKeySingle from './_recordings/milestone-key-single.ts';

export default {
  id: 'map-route-waypoint-added', name: "Map route waypoint added", category: 'Sci-Fi & UI',
  tags: ["ui", "map", "waypoint", "route", "navigation"],
  loopable: false, durationSec: 0.191, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick, milestoneKeySingle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.039, 0.66, 1, 10500, 0, 0.001, 0.022],
      [milestoneKeySingle, 0.067, 0.074, 0.42, 1.29, 8400.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
