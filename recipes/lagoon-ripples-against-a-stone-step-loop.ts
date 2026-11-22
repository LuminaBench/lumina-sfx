import { biquad } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import atlasPebble from './_recordings/atlas-pebble.ts';
import milestoneSmallwater from './_recordings/milestone-smallwater.ts';
import atlasBubbles from './_recordings/atlas-bubbles.ts';
import wateringCanDip from './_recordings/watering-can-dip.ts';
import waterDropsFromSpout from './_recordings/water-drops-from-spout.ts';

export default {
  id: 'lagoon-ripples-against-a-stone-step-loop', name: "Lagoon Ripples Against a Stone Step (Loop)", category: 'Water & Fire',
  tags: ["lagoon", "ripples", "water", "stone", "loop", "gentle", "ambience"],
  durationSec: 6.0, loopable: true, mixRole: 'ambience', targetRmsDbfs: -24.0,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...performanceCredits(atlasPebble, milestoneSmallwater, atlasBubbles, wateringCanDip, waterDropsFromSpout),
  render(ctx, { seed, params }) {
    const ripples = perform(ctx, seed, params.intensity, [
      [atlasPebble, 0, 2.5, 0.57, 0.9, 6700, 0.05, 0.004, 0.4],
      [milestoneSmallwater, 0, 1.35, 0.38, 0.88, 4200, 0.04, 0.38, 0.52],
      [atlasBubbles, 0.25, 1.5, 0.22, 0.82, 3400, 0.06, 0.45, 0.55],
      [wateringCanDip, 0.55, 1.3, 0.34, 0.86, 3100, 0.05, 0.36, 0.48],
      [waterDropsFromSpout, 0.95, 0.72, 0.2, 1.04, 6800, 0.02, 0.08, 0.36],
      [milestoneSmallwater, 1.45, 1.4, 0.42, 0.94, 4600, 0.1, 0.42, 0.54],
      [atlasBubbles, 1.75, 1.55, 0.24, 0.78, 3200, 0.12, 0.48, 0.58],
      [wateringCanDip, 2.2, 1.35, 0.32, 0.91, 3300, 0.08, 0.4, 0.52],
      [waterDropsFromSpout, 2.65, 0.68, 0.18, 0.96, 6200, 0.1, 0.1, 0.34],
      [milestoneSmallwater, 2.95, 1.4, 0.39, 0.85, 4000, 0.06, 0.44, 0.54],
      [atlasBubbles, 3.25, 1.5, 0.23, 0.84, 3500, 0.04, 0.46, 0.56],
      [wateringCanDip, 3.85, 1.35, 0.35, 0.83, 2950, 0.11, 0.38, 0.52],
      [waterDropsFromSpout, 4.25, 0.74, 0.21, 1.08, 7000, 0.05, 0.08, 0.38],
      [milestoneSmallwater, 4.45, 1.45, 0.4, 0.91, 4400, 0.08, 0.44, 0.58],
      [atlasBubbles, 4.65, 1.35, 0.22, 0.8, 3300, 0.14, 0.42, 0.55],
      [wateringCanDip, 4.95, 1.05, 0.3, 0.88, 3050, 0.06, 0.32, 0.45],
      [waterDropsFromSpout, 5.3, 0.65, 0.17, 0.98, 6400, 0.12, 0.08, 0.34],
      [atlasPebble, 3.15, 2.9, 0.51, 0.87, 5100, 0, 0.3, 0.42],
    ]);
    return ripples.map(biquad('highpass', 142, 0.71, ctx.sampleRate));
  },
} satisfies SoundRecipe;
