import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "aluminum-plate-keyboard-key-up", "Aluminum-plate keyboard letter key release",
  ["keyboard", "key", "launch", "video", "mechanical", "metal", "clack", "single", "lift", "release"], 0.114, attack,
  {"bodyHz": 680, "decayMs": 17, "cutoffHz": 8600, "snap": 1.05, "rattle": 0.15, "plateHz": 6300},
  [
    {"at": 0, "weight": 0.63, "pitch": 1.14, "release": true}
  ],
);
