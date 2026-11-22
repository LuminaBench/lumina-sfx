import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "linen-page-wipe", "Linen page wipe",
  ["transition", "whoosh", "launch", "video", "textile", "woven", "dry", "wipe", "page", "unfold"],
  {"lowHz": 740, "highHz": 4460, "grainHz": 88, "grainDepth": 0.58, "air": 0.025, "body": 2.35},
  {"duration": 0.42, "apex": 0.59, "direction": -1, "travel": 0.55, "reverse": true, "echo": 0.045},
);
