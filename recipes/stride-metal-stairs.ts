import { strideContact } from './_shared/stride-contact.ts';
import contact from './_recordings/natural-metal.ts';
import tread from './_recordings/stride-stair-treads.ts';

export default strideContact('metal-stairs', ['metal', 'stairs', 'steel', 'staircase', 'grate', 'tread'],
  contact, -24, .66, {
    cutoffHz: 6600, sprintTailSec: .39,
    release: {clip: tread, startSec: 0, gain: .74, cutoffHz: 3100},
    // A boot loads the tread at low frequencies. Only its initial edge needs presence.
    spectrum: [{band: 'sub', minShare: .08}, {band: 'high', minShare: .001}],
  });
