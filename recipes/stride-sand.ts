import { strideContact } from './_shared/stride-contact.ts';
import original from './_recordings/dry-sand-footstep.ts';
import extra from './_recordings/stride-sand-extra.ts';

// Interleave the cuts in the order of the original sandy-ground walk.
const takes = [...original.takes.slice(0, 3), extra.takes[0], original.takes[3], ...extra.takes.slice(1)];
export default strideContact('sand', ['dry', 'dune', 'beach', 'soft', 'grain'],
  {...original, takes}, -29, .59, {cutoffHz: 2750, sprintTailSec: .30});
