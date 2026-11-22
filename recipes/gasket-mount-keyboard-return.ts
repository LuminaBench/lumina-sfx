import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "gasket-mount-keyboard-return", "Gasket-mounted keyboard Return key",
  ["keyboard", "key", "launch", "video", "mechanical", "soft", "thock", "enter", "submit"], 0.193, attack,
  {"bodyHz": 240, "decayMs": 18, "cutoffHz": 4600, "snap": 0.86, "rattle": 0.018},
  [
    {"at": 0, "weight": 1, "pitch": 0.78},
    {"at": 0.073, "weight": 0.34, "pitch": 0.94, "release": true}
  ],
);
