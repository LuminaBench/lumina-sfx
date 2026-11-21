import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-rocker.ts';

export default {
  id: "armor-break-dry-crack-and-scrape",
  name: "Armor break dry crack and scrape",
  category: "Footsteps & UI",
  tags: ["armor", "break", "dry", "crack", "scrape", "event", "combat", "feedback"],
  loopable: false,
  durationSec: 0.341,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .093, .52, 0, 9650, .001, .018],
      ["contact", "glass", 0, .072, .87, 1530, .00052],
      ["contact", "iron", .042, .21, .46, 486, .001],
      ["grains", "glass", .028, .26, .63, 2080, 13],
    ]);
  },
} satisfies SoundRecipe;
