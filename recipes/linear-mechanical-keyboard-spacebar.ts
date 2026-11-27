import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-linear-key-travel.ts';

export default editorContact(
  "linear-mechanical-keyboard-spacebar", "Linear mechanical keyboard spacebar tap",
  ["keyboard", "key", "launch", "video", "mechanical", "smooth", "space", "bar", "stabilizer"], 0.169, attack,
  { captured: true, pairedTakes: true, cutoffHz: 11500 },
  [
    {"at": 0, "weight": 1, "pitch": 0.6},
    {"at": 0.007, "weight": 0.2, "pitch": 1.36},
    {"at": 0.085, "weight": 0.38, "pitch": 0.74, "release": true}
  ],
);
