import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-sideswipe-scrape.ts';

export default {
  id: "car-sideswipe-scrape", name: "Car Sideswipe Scrape", category: "Vehicles & Engines",
  tags: ["car","crash","collision","scrape"], loopable: false, durationSec: 1.51,
  params: { pressure: { label: "Pressure", min: 0, max: 1, default: 0.65 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.991 + params.pressure * 0.023, cutoffHz: 9360 + params.pressure * 3940 });
  },
} satisfies SoundRecipe;
