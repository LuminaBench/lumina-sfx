import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-office.ts';

export default editorContact(
  "chiclet-keyboard-typed-word", "Compact chiclet keyboard four-letter word",
  ["keyboard", "key", "launch", "video", "normal", "slim", "low-profile", "typing", "text", "word", "burst"], 0.395, attack,
  {"bodyHz": 860, "decayMs": 6, "cutoffHz": 5400, "snap": 1.12, "rattle": 0.012},
  [
    {"at": 0, "weight": 0.88, "pitch": 1.06},
    {"at": 0.106, "weight": 1, "pitch": 0.93},
    {"at": 0.184, "weight": 0.76, "pitch": 1.14},
    {"at": 0.328, "weight": 0.94, "pitch": 0.97}
  ],
);
