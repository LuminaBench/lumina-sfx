import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/shovel-dry-earth.ts';

export default {
  id: "shovel-dry-earth", name: "Shovel Scraping Dry Earth", category: "Farming",
  tags: ["shovel", "scraping", "dry", "dirt", "tool"],
  durationSec: 1.0627, loopable: false, targetRmsDbfs: -23,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 8500 - params.distance * 5270 });
  },
} satisfies SoundRecipe;
