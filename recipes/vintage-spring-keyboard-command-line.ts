import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "vintage-spring-keyboard-command-line", "Buckling-spring keyboard command then Return",
  ["keyboard", "key", "launch", "video", "mechanical", "vintage", "spring", "typing", "terminal", "command", "phrase"], 0.897, attack,
  {"bodyHz": 455, "decayMs": 22, "cutoffHz": 8500, "snap": 1.45, "rattle": 0.22},
  [
    {"at": 0, "weight": 0.73, "pitch": 1.08},
    {"at": 0.088, "weight": 0.94, "pitch": 0.9},
    {"at": 0.197, "weight": 0.71, "pitch": 1.13},
    {"at": 0.276, "weight": 0.82, "pitch": 1.03},
    {"at": 0.406, "weight": 0.8, "pitch": 0.95},
    {"at": 0.669, "weight": 1, "pitch": 0.72},
    {"at": 0.753, "weight": 0.32, "pitch": 0.92, "release": true}
  ],
);
