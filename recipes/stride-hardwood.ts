import { strideContact } from './_shared/stride-contact.ts';
import contact from './_recordings/stride-hardwood.ts';
import dampSole from './_recordings/natural-asphalt.ts';

export default strideContact('hardwood', ['wood', 'floor', 'indoor'], contact, -23, 0.46, dampSole);
