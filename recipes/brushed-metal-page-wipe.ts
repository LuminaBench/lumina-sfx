import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "brushed-metal-page-wipe", "Brushed metal page wipe",
  ["transition", "whoosh", "launch", "video", "metal", "foil", "brushed", "wipe", "page", "unfold"],
  {"lowHz": 1320, "highHz": 8380, "grainHz": 181, "grainDepth": 0.37, "air": 0.058, "body": 1.9},
  {"duration": 0.42, "apex": 0.59, "direction": -1, "travel": 0.55, "reverse": true, "echo": 0.045},
);
