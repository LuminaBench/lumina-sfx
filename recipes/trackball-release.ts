import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-button.ts';

export default editorContact(
  "trackball-release", "Trackball button release",
  ["device", "launch", "video", "mouse", "trackball", "desktop", "lift", "up"], 0.072, attack,
  {"bodyHz": 570, "decayMs": 10, "cutoffHz": 5700, "snap": 1.15, "rattle": 0.03},
  [
    {"at": 0, "weight": 0.61, "pitch": 1.16, "release": true}
  ],
);
