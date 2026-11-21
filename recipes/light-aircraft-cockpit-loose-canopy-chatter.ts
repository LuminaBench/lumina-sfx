import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-steady.ts';
import source2 from './_recordings/motion-clank-close.ts';

export default {
  id: "light-aircraft-cockpit-loose-canopy-chatter",
  name: "Light aircraft cockpit loose canopy chatter",
  category: "Aircraft",
  tags: ["light", "aircraft", "cockpit", "loose", "canopy", "chatter", "flight"],
  loopable: false,
  durationSec: 2.42,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.4, .46, .27, 1180, .006, .21],
      ['clip', source2, 0, .29, .52, .024, 7100, .002, .045],
      ["brush", "rubber", .41, .52, .31, 458, .012],
      ["grains", "iron", .12, 2.13, .32, 1180, 12],
    ]);
  },
} satisfies SoundRecipe;
