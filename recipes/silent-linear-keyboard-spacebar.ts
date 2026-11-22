import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "silent-linear-keyboard-spacebar", "Damped linear keyboard spacebar tap",
  ["keyboard", "key", "launch", "video", "mechanical", "quiet", "rubber", "space", "bar", "stabilizer"], 0.152, attack,
  {"bodyHz": 275, "decayMs": 7, "cutoffHz": 2850, "snap": 0.65, "rattle": 0.008},
  [
    {"at": 0, "weight": 1, "pitch": 0.6},
    {"at": 0.007, "weight": 0.2, "pitch": 1.36},
    {"at": 0.085, "weight": 0.38, "pitch": 0.74, "release": true}
  ],
);
