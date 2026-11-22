import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "aluminum-plate-keyboard-spacebar", "Aluminum-plate keyboard spacebar tap",
  ["keyboard", "key", "launch", "video", "mechanical", "metal", "clack", "space", "bar", "stabilizer"], 0.199, attack,
  {"bodyHz": 680, "decayMs": 17, "cutoffHz": 8600, "snap": 1.05, "rattle": 0.15, "plateHz": 6300},
  [
    {"at": 0, "weight": 1, "pitch": 0.6},
    {"at": 0.007, "weight": 0.2, "pitch": 1.36},
    {"at": 0.085, "weight": 0.38, "pitch": 0.74, "release": true}
  ],
);
