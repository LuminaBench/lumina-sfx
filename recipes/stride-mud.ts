import { strideContact } from './_shared/stride-contact.ts';
import original from './_recordings/natural-mud.ts';
import lastRun from './_recordings/stride-mud-run-extra.ts';
import suction from './_recordings/stride-mud-suction.ts';

// The recordist performed five walking contacts, then five running contacts.
const walking = {...original, takes: original.takes.slice(0, 5)};
const running = {...original, takes: [...original.takes.slice(5), ...lastRun.takes]};
export default strideContact('mud', ['wet', 'soft', 'suction', 'squelch', 'muddy'],
  walking, -25, .57, {running, cutoffHz: 2650, sprintTailSec: .34,
    release: {clip: suction, startSec: 0, gain: 1.35, wetGain: 1.7, cutoffHz: 3200}});
