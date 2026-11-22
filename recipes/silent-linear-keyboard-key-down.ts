import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "silent-linear-keyboard-key-down", "Damped linear keyboard letter key down",
  ["keyboard", "key", "launch", "video", "mechanical", "quiet", "rubber", "single", "tap", "press"], 0.067, attack,
  {"bodyHz": 275, "decayMs": 7, "cutoffHz": 2850, "snap": 0.65, "rattle": 0.008},
  [
    {"at": 0, "weight": 1, "pitch": 1}
  ],
);
