import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "silent-linear-keyboard-command-line", "Damped linear keyboard command then Return",
  ["keyboard", "key", "launch", "video", "mechanical", "quiet", "rubber", "typing", "terminal", "command", "phrase"], 0.82, attack,
  {"bodyHz": 275, "decayMs": 7, "cutoffHz": 2850, "snap": 0.65, "rattle": 0.008},
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
