import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "camera-shutter-button-release", "Camera shutter button release",
  ["device", "launch", "video", "camera", "focus", "detent", "lift", "up"], 0.067, attack,
  {"bodyHz": 680, "decayMs": 7, "cutoffHz": 7500, "snap": 1.03, "rattle": 0.032},
  [
    {"at": 0, "weight": 0.61, "pitch": 1.16, "release": true}
  ],
);
