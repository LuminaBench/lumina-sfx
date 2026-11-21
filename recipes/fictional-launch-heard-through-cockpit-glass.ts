import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-turbine-ignition.ts';

export default {
  id: "fictional-launch-heard-through-cockpit-glass",
  name: "Fictional launch heard through cockpit glass",
  category: "Missiles",
  tags: ["fictional", "launch", "heard", "cockpit", "glass", "projectile", "flight", "whoosh"],
  loopable: false,
  durationSec: 1.85,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "launch", focus: 0, width: .31, whistle: 95,
      weight: .66, cutoff: 1430, reflection: .12,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .02, 1.65, .32, .42, 1210, .025, .49],
      ["contact", "glass", 0, .15, .41, 302, .003],
      ["contact", "iron", .13, .26, .21, 210, .004],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
