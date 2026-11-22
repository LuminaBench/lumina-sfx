import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-firm.ts';

export default editorContact(
  "aluminum-plate-keyboard-typed-word", "Aluminum-plate keyboard four-letter word",
  ["keyboard", "key", "launch", "video", "mechanical", "metal", "clack", "typing", "text", "word", "burst"], 0.442, attack,
  {"bodyHz": 680, "decayMs": 17, "cutoffHz": 8600, "snap": 1.05, "rattle": 0.15, "plateHz": 6300},
  [
    {"at": 0, "weight": 0.88, "pitch": 1.06},
    {"at": 0.106, "weight": 1, "pitch": 0.93},
    {"at": 0.184, "weight": 0.76, "pitch": 1.14},
    {"at": 0.328, "weight": 0.94, "pitch": 0.97}
  ],
);
