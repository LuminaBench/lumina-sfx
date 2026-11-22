import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "camera-shutter-button-press-and-hold", "Camera shutter button press, hold and release",
  ["device", "launch", "video", "camera", "focus", "detent", "hold", "drag", "drop"], 0.557, attack,
  {"bodyHz": 680, "decayMs": 7, "cutoffHz": 7500, "snap": 1.03, "rattle": 0.032},
  [
    {"at": 0, "weight": 1, "pitch": 0.91},
    {"at": 0.49, "weight": 0.55, "pitch": 1.12, "release": true}
  ],
);
