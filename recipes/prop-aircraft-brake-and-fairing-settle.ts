import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-hydraulic-start.ts';

export default {
  id: "prop-aircraft-brake-and-fairing-settle",
  name: "Prop aircraft brake and fairing settle",
  category: "Aircraft",
  tags: ["prop", "aircraft", "brake", "fairing", "settle", "flight", "plane"],
  loopable: false,
  durationSec: 1.55,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.32, .58, .045, 3210, .005, .2],
      ["contact", "rubber", 0, .19, .52, 249, .004],
      ["contact", "iron", .705, .127, .41, 870, .002],
      ["grains", "iron", .89, .50, .19, 1230, 5],
    ]);
  },
} satisfies SoundRecipe;
