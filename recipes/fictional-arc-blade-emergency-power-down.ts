import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "fictional-arc-blade-emergency-power-down",
  name: "Fictional arc blade emergency power down",
  category: "Weapons",
  tags: ["fictional", "arc", "blade", "emergency", "power", "down"],
  loopable: false,
  durationSec: 1.2,
  targetRmsDbfs: -25.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .074, .65, 733, .001],
      ["motor", 0, .91, .59, 242, 45, .0025, .82],
      ["tone", 0, .74, .32, 1640, 154, .0042, .6],
      ["brush", "air", .09, .82, .32, 1340, .016],
      ["contact", "iron", .88, .15, .49, 560, .0016],
    ]);
  },
} satisfies SoundRecipe;
