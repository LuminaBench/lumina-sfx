import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-button.ts';
import source2 from './_recordings/response-rocker.ts';
import source3 from './_recordings/response-microclick.ts';

export default {
  id: "slider-notched-dial-across-three-stops",
  name: "Slider notched dial across three stops",
  category: "Footsteps & UI",
  tags: ["slider", "notched", "dial", "across", "three", "stops", "ui", "interface"],
  loopable: false,
  durationSec: 0.233,
  targetRmsDbfs: -30.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .065, .62, 0, 6400, .001, .012],
      ['clip', source2, .063, .067, .38, .001, 5600, .001, .018],
      ['clip', source3, .109, .041, .57, .001, 7600, .001, .008],
      ["contact", "rubber", .131, .071, .36, 460, .001],
    ]);
  },
} satisfies SoundRecipe;
