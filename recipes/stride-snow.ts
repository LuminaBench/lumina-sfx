import { strideContact } from './_shared/stride-contact.ts';
import contact from './_recordings/natural-snow.ts';
import crust from './_recordings/icy-crust-footstep.ts';

export default strideContact('snow', ['packed', 'winter', 'compression', 'crunch'],
  contact, -25.5, .59, {cutoffHz: 6800, sprintTailSec: .32,
    release: {clip: crust, startSec: .085, gain: .85, wetGain: .4, cutoffHz: 6200}});
