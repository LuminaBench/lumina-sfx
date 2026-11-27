import { strideContact } from './_shared/stride-contact.ts';
import contact from './_recordings/natural-gravel.ts';

export default {
  ...strideContact('gravel', ['shoe', 'boot', 'stones', 'grit', 'pebbles'], contact, -25, 0.48),
  isolation: 'isolated' as const, components: ['footstep'],
};
