import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "office-membrane-keyboard-key-down", "Office membrane keyboard letter key down",
  ["keyboard", "key", "launch", "video", "normal", "desktop", "rubber", "dome", "single", "tap", "press"], 0.067, attack,
  {"bodyHz": 325, "decayMs": 8, "cutoffHz": 3100, "snap": 0.7, "rattle": 0.01},
  [
    {"at": 0, "weight": 1, "pitch": 1}
  ],
);
