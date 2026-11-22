import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "quiet-mouse-release", "Silent mouse release",
  ["device", "launch", "video", "mouse", "pointer", "damped", "lift", "up"], 0.067, attack,
  {"bodyHz": 350, "decayMs": 6, "cutoffHz": 2800, "snap": 0.56, "rattle": 0.01},
  [
    {"at": 0, "weight": 0.61, "pitch": 1.16, "release": true}
  ],
);
