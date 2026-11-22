import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "vintage-spring-keyboard-spacebar", "Buckling-spring keyboard spacebar tap",
  ["keyboard", "key", "launch", "video", "mechanical", "vintage", "spring", "space", "bar", "stabilizer"], 0.229, attack,
  {"bodyHz": 455, "decayMs": 22, "cutoffHz": 8500, "snap": 1.45, "rattle": 0.22},
  [
    {"at": 0, "weight": 1, "pitch": 0.6},
    {"at": 0.007, "weight": 0.2, "pitch": 1.36},
    {"at": 0.085, "weight": 0.38, "pitch": 0.74, "release": true}
  ],
);
