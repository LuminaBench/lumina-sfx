import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-button.ts';

export default editorContact(
  "trackball-press-and-hold", "Trackball button press, hold and release",
  ["device", "launch", "video", "mouse", "trackball", "desktop", "hold", "drag", "drop"], 0.562, attack,
  {"bodyHz": 570, "decayMs": 10, "cutoffHz": 5700, "snap": 1.15, "rattle": 0.03},
  [
    {"at": 0, "weight": 1, "pitch": 0.91},
    {"at": 0.49, "weight": 0.55, "pitch": 1.12, "release": true}
  ],
);
