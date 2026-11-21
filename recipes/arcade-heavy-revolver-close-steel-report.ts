import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-metal-pressure.ts';

export default {
  id: "arcade-heavy-revolver-close-steel-report",
  name: "Arcade heavy revolver close steel report",
  category: "Weapons",
  tags: ["arcade", "heavy", "revolver", "close", "steel", "report", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.8,
  targetRmsDbfs: -20.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .012, body: 138, crack: 9720, edge: 1.01, action: .37, space: "close",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .68, .47, .005, 8250, .001, .19],
      ["contact", "iron", .072, .123, .31, 414, .0018],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
