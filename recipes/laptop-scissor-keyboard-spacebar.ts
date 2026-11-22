import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "laptop-scissor-keyboard-spacebar", "Laptop scissor keyboard spacebar tap",
  ["keyboard", "key", "launch", "video", "normal", "notebook", "low-profile", "space", "bar", "stabilizer"], 0.152, attack,
  {"bodyHz": 1050, "decayMs": 5, "cutoffHz": 6700, "snap": 1.25, "rattle": 0.016},
  [
    {"at": 0, "weight": 1, "pitch": 0.6},
    {"at": 0.007, "weight": 0.2, "pitch": 1.36},
    {"at": 0.085, "weight": 0.38, "pitch": 0.74, "release": true}
  ],
);
