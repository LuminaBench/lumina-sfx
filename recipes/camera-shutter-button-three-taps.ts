import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "camera-shutter-button-three-taps", "Camera shutter button three deliberate taps",
  ["device", "launch", "video", "camera", "focus", "detent", "triple", "repeat"], 0.39, attack,
  {"bodyHz": 680, "decayMs": 7, "cutoffHz": 7500, "snap": 1.03, "rattle": 0.032},
  [
    {"at": 0, "weight": 0.8, "pitch": 1.03},
    {"at": 0.137, "weight": 1, "pitch": 0.96},
    {"at": 0.323, "weight": 0.89, "pitch": 1.06}
  ],
);
