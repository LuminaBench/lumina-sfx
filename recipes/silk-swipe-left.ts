import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "silk-swipe-left", "Silk leftward swipe",
  ["transition", "whoosh", "launch", "video", "soft", "fabric", "satin", "swipe", "left", "slide"],
  {"lowHz": 490, "highHz": 3650, "grainHz": 14, "grainDepth": 0.11, "air": 0.016, "body": 2.55},
  {"duration": 0.19, "apex": 0.3, "direction": -1, "travel": 0.84, "reverse": false, "echo": 0},
);
