import { strideContact } from './_shared/stride-contact.ts';
import contact from './_recordings/natural-concrete.ts';
import dampSole from './_recordings/natural-asphalt.ts';

export default strideContact('concrete', ['pavement', 'cement'], contact, -23, 0.47, dampSole);
