import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "soft-air-pull-away", "Soft air pull away",
  ["transition", "whoosh", "launch", "video", "quiet", "airy", "diffuse", "zoom", "out", "retreat"],
  {"lowHz": 395, "highHz": 2170, "grainHz": 4, "grainDepth": 0.08, "air": 0.036, "body": 3.55},
  {"duration": 0.48, "apex": 0.12, "direction": 0, "travel": 0, "reverse": true, "echo": 0.12},
);
