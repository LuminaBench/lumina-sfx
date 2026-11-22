import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "gasket-mount-keyboard-spacebar", "Gasket-mounted keyboard spacebar tap",
  ["keyboard", "key", "launch", "video", "mechanical", "soft", "thock", "space", "bar", "stabilizer"], 0.205, attack,
  {"bodyHz": 240, "decayMs": 18, "cutoffHz": 4600, "snap": 0.86, "rattle": 0.018},
  [
    {"at": 0, "weight": 1, "pitch": 0.6},
    {"at": 0.007, "weight": 0.2, "pitch": 1.36},
    {"at": 0.085, "weight": 0.38, "pitch": 0.74, "release": true}
  ],
);
