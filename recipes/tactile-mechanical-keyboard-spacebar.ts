import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "tactile-mechanical-keyboard-spacebar", "Tactile mechanical keyboard spacebar tap",
  ["keyboard", "key", "launch", "video", "mechanical", "bump", "space", "bar", "stabilizer"], 0.157, attack,
  {"bodyHz": 530, "decayMs": 10, "cutoffHz": 7500, "snap": 1.25, "rattle": 0.04},
  [
    {"at": 0, "weight": 1, "pitch": 0.6},
    {"at": 0.007, "weight": 0.2, "pitch": 1.36},
    {"at": 0.085, "weight": 0.38, "pitch": 0.74, "release": true}
  ],
);
