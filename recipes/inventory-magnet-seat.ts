import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import attack from './_recordings/isolated-wooden-chest-latch-release.ts';

export default {
  id: 'inventory-magnet-seat',
  name: 'Magnetic seat · inventory drop',
  category: 'Footsteps & UI',
  tags: ["menu", "ui", "inventory", "drag", "drop", "valid", "slot", "magnet", "magnetic", "seat"],
  isolation: 'isolated',
  mixRole: 'interface',
  loopable: false,
  durationSec: 0.189,
  targetRmsDbfs: -26,
  perspective: 'local interface',
  contains: ['fabric drag and magnetic seat'],
  markers: { seat: 0.061 },
  params: { pressure: { label: 'Finger pressure', min: 0, max: 1, default: 0.5 } },
  ...sceneCredits(attack),
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', attack, 0, 0.034, 0.48, 0, 5500, 0.0003, 0.004],
      ["brush", "cloth", 0, 0.075, 0.43, 830, 0.002],
      ["contact", "iron", 0.054, 0.038, 0.33, 1290, 0.0005],
      ["contact", "wood", 0.061, 0.112, 0.74, 520, 0.0007],
    ]);
  },
} satisfies SoundRecipe;
