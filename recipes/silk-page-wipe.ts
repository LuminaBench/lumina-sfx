import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "silk-page-wipe", "Silk page wipe",
  ["transition", "whoosh", "launch", "video", "soft", "fabric", "satin", "wipe", "page", "unfold"],
  {"lowHz": 490, "highHz": 3650, "grainHz": 14, "grainDepth": 0.11, "air": 0.016, "body": 2.55},
  {"duration": 0.42, "apex": 0.59, "direction": -1, "travel": 0.55, "reverse": true, "echo": 0.045},
);
