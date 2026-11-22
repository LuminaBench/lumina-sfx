import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "brushed-metal-swipe-left", "Brushed metal leftward swipe",
  ["transition", "whoosh", "launch", "video", "metal", "foil", "brushed", "swipe", "left", "slide"],
  {"lowHz": 1320, "highHz": 8380, "grainHz": 181, "grainDepth": 0.37, "air": 0.058, "body": 1.9},
  {"duration": 0.19, "apex": 0.3, "direction": -1, "travel": 0.84, "reverse": false, "echo": 0},
);
