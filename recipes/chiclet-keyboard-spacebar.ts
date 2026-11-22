import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "chiclet-keyboard-spacebar", "Compact chiclet keyboard spacebar tap",
  ["keyboard", "key", "launch", "video", "normal", "slim", "low-profile", "space", "bar", "stabilizer"], 0.152, attack,
  {"bodyHz": 860, "decayMs": 6, "cutoffHz": 5400, "snap": 1.12, "rattle": 0.012},
  [
    {"at": 0, "weight": 1, "pitch": 0.6},
    {"at": 0.007, "weight": 0.2, "pitch": 1.36},
    {"at": 0.085, "weight": 0.38, "pitch": 0.74, "release": true}
  ],
);
