import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/hardwood-footstep.ts';
import source2 from './_recordings/milestone-oar.ts';
import source3 from './_recordings/milestone-smallwater.ts';

export default {
  id: "canvas-kayak-in-a-cove-soft-boarding-contact",
  name: "Canvas Kayak in a Cove Soft Boarding Contact",
  category: "Water & Fire",
  tags: ["canvas", "kayak", "cove", "soft", "boarding", "contact"],
  loopable: false,
  durationSec: 1.26,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.46, 0.59, 0.09, 3669.5, 0.007, 0.08],
      ["contact", "wood", 0.038, 0.37, 0.38, 350.4, 0.002],
      ['clip', source2, 0.12, 0.58, 0.3, 0.14, 4100, 0.007, 0.08],
      ['clip', source3, 0.34, 0.79, 0.43, 0.08, 4100, 0.007, 0.08],
    ]);
  },
} satisfies SoundRecipe;
