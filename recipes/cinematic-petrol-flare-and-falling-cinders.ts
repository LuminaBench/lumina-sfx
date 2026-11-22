import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import burlapFeedSackOpen from './_recordings/burlap-feed-sack-open.ts';
import atlasThunderRoll from './_recordings/atlas-thunder-roll.ts';
import atlasFire from './_recordings/atlas-fire.ts';
import atlasFirecracker from './_recordings/atlas-firecracker.ts';
import naturalGravel from './_recordings/natural-gravel.ts';

export default {
  id: 'cinematic-petrol-flare-and-falling-cinders', name: "Cinematic Petrol Flare and Falling Cinders", category: 'Water & Fire',
  tags: ["fire", "flare", "ignition", "whoosh", "cinders", "embers", "cinematic", "explosion"],
  durationSec: 5.2, loopable: false, mixRole: 'impact', targetRmsDbfs: -12.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...performanceCredits(burlapFeedSackOpen, atlasThunderRoll, atlasFire, atlasFirecracker, naturalGravel),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.intensity, [
      [burlapFeedSackOpen, 0, 0.72, 0.68, 0.74, 2400, 0.02, 0.03, 0.34],
      [atlasThunderRoll, 0.035, 1.75, 0.94, 0.44, 260, 0.0, 0.04, 0.95],
      [atlasFire, 0.06, 1.4, 0.9, 0.88, 6400, 0.02, 0.08, 0.52],
      [atlasFirecracker, 0.14, 0.32, 0.54, 1.16, 10800, 0.02, 0.005, 0.18],
      [atlasFire, 0.72, 1.55, 0.84, 0.78, 4800, 0.08, 0.22, 0.64],
      [atlasThunderRoll, 0.95, 1.85, 0.62, 0.48, 310, 0.12, 0.28, 0.98],
      [atlasFirecracker, 1.18, 0.38, 0.42, 1.04, 9600, 0.08, 0.01, 0.2],
      [atlasFire, 1.75, 1.5, 0.64, 0.84, 4200, 0.12, 0.28, 0.68],
      [naturalGravel, 2.05, 1.05, 0.36, 1.24, 9200, 0.04, 0.18, 0.44],
      [atlasFirecracker, 2.48, 0.34, 0.32, 1.22, 11200, 0.12, 0.01, 0.2],
      [naturalGravel, 2.85, 1.15, 0.4, 1.16, 8400, 0.1, 0.22, 0.5],
      [atlasFire, 3.1, 1.45, 0.34, 0.9, 3200, 0.16, 0.32, 0.75],
      [naturalGravel, 3.82, 1.18, 0.28, 1.1, 7600, 0.1048, 0.24, 0.66],
      [atlasFirecracker, 4.35, 0.42, 0.2, 1.28, 10400, 0.14, 0.02, 0.28],
    ]);
  },
} satisfies SoundRecipe;
