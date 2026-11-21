import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "menu-cancel-felt-stop",
  name: "Menu cancel felt stop",
  category: "Footsteps & UI",
  tags: ["menu", "cancel", "felt", "stop", "ui", "interface"],
  loopable: false,
  durationSec: 0.16,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "cloth", 0, .091, .70, 730, .001],
      ["tone", 0, .058, .094, 1100, 430, .001, .18],
      ["contact", "rubber", .051, .091, .48, 281, .0011],
    ]);
  },
} satisfies SoundRecipe;
