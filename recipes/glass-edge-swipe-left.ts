import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "glass-edge-swipe-left", "Glass edge leftward swipe",
  ["transition", "whoosh", "launch", "video", "glass", "bright", "clean", "swipe", "left", "slide"],
  {"lowHz": 2250, "highHz": 9250, "grainHz": 240, "grainDepth": 0.11, "air": 0.024, "body": 1.23},
  {"duration": 0.19, "apex": 0.3, "direction": -1, "travel": 0.84, "reverse": false, "echo": 0},
);
