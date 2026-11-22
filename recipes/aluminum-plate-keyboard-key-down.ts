import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-firm.ts';

export default editorContact(
  "aluminum-plate-keyboard-key-down", "Aluminum-plate keyboard letter key down",
  ["keyboard", "key", "launch", "video", "mechanical", "metal", "clack", "single", "tap", "press"], 0.114, attack,
  {"bodyHz": 680, "decayMs": 17, "cutoffHz": 8600, "snap": 1.05, "rattle": 0.15, "plateHz": 6300},
  [
    {"at": 0, "weight": 1, "pitch": 1}
  ],
);
