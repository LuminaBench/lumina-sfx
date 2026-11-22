import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-button.ts';

export default editorContact(
  "trackball-three-taps", "Trackball button three deliberate taps",
  ["device", "launch", "video", "mouse", "trackball", "desktop", "triple", "repeat"], 0.395, attack,
  {"bodyHz": 570, "decayMs": 10, "cutoffHz": 5700, "snap": 1.15, "rattle": 0.03},
  [
    {"at": 0, "weight": 0.8, "pitch": 1.03},
    {"at": 0.137, "weight": 1, "pitch": 0.96},
    {"at": 0.323, "weight": 0.89, "pitch": 1.06}
  ],
);
