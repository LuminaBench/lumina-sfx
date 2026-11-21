import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldJarTurn from './_recordings/field-jar-turn.ts';
import fieldGlassLid from './_recordings/field-glass-lid.ts';
import fieldJarContact from './_recordings/field-jar-contact.ts';

export default {
  id: 'glass-jar-lid-spun-home', name: "Glass jar lid spun home", category: 'Props & Interactions',
  tags: ["jar", "close", "crafting", "preserve"],
  loopable: false, durationSec: 0.97, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldJarTurn, fieldGlassLid, fieldJarContact),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [fieldJarTurn, 0.0, 0.67, 0.83, 1, 10500, 0, 0.001, 0.022],
      [fieldGlassLid, 0.57, 0.21, 0.51, 1, 10500, 0, 0.001, 0.022],
      [fieldJarContact, 0.75, 0.17, 0.35, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
