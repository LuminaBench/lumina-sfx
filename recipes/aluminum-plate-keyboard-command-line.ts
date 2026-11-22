import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "aluminum-plate-keyboard-command-line", "Aluminum-plate keyboard command then Return",
  ["keyboard", "key", "launch", "video", "mechanical", "metal", "clack", "typing", "terminal", "command", "phrase"], 0.867, attack,
  {"bodyHz": 680, "decayMs": 17, "cutoffHz": 8600, "snap": 1.05, "rattle": 0.15, "plateHz": 6300},
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
