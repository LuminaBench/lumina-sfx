import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "linen-swipe-right", "Linen rightward swipe",
  ["transition", "whoosh", "launch", "video", "textile", "woven", "dry", "swipe", "right", "slide"],
  {"lowHz": 740, "highHz": 4460, "grainHz": 88, "grainDepth": 0.58, "air": 0.025, "body": 2.35},
  {"duration": 0.19, "apex": 0.3, "direction": 1, "travel": 0.84, "reverse": false, "echo": 0},
);
