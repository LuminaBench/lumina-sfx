import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-street-pressure.ts';

export default {
  id: "compact-sidearm-underpass-reflection",
  name: "Compact sidearm underpass reflection",
  category: "Weapons",
  tags: ["compact", "sidearm", "underpass", "reflection", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -23.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0048, body: 168, crack: 9100, edge: .76, action: .13, space: "alley",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "air", .14, .17, .17, 660, .009],
      ['clip', source, .057, .84, .21, .026, 2800, .041, .25],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
