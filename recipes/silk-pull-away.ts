import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "silk-pull-away", "Silk pull away",
  ["transition", "whoosh", "launch", "video", "soft", "fabric", "satin", "zoom", "out", "retreat"],
  {"lowHz": 490, "highHz": 3650, "grainHz": 14, "grainDepth": 0.11, "air": 0.016, "body": 2.55},
  {"duration": 0.48, "apex": 0.12, "direction": 0, "travel": 0, "reverse": true, "echo": 0.12},
);
