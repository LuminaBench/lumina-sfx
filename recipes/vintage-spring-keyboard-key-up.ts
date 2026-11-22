import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-firm.ts';

export default editorContact(
  "vintage-spring-keyboard-key-up", "Buckling-spring keyboard letter key release",
  ["keyboard", "key", "launch", "video", "mechanical", "vintage", "spring", "single", "lift", "release"], 0.144, attack,
  {"bodyHz": 455, "decayMs": 22, "cutoffHz": 8500, "snap": 1.45, "rattle": 0.22},
  [
    {"at": 0, "weight": 0.63, "pitch": 1.14, "release": true}
  ],
);
