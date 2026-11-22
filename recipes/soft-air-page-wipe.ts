import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "soft-air-page-wipe", "Soft air page wipe",
  ["transition", "whoosh", "launch", "video", "quiet", "airy", "diffuse", "wipe", "page", "unfold"],
  {"lowHz": 395, "highHz": 2170, "grainHz": 4, "grainDepth": 0.08, "air": 0.036, "body": 3.55},
  {"duration": 0.42, "apex": 0.59, "direction": -1, "travel": 0.55, "reverse": true, "echo": 0.045},
);
