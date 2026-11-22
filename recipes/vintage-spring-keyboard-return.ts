import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "vintage-spring-keyboard-return", "Buckling-spring keyboard Return key",
  ["keyboard", "key", "launch", "video", "mechanical", "vintage", "spring", "enter", "submit"], 0.217, attack,
  {"bodyHz": 455, "decayMs": 22, "cutoffHz": 8500, "snap": 1.45, "rattle": 0.22},
  [
    {"at": 0, "weight": 1, "pitch": 0.78},
    {"at": 0.073, "weight": 0.34, "pitch": 0.94, "release": true}
  ],
);
