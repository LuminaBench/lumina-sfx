import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "low-pass-swipe-right", "Low pass rightward swipe",
  ["transition", "whoosh", "launch", "video", "bass", "deep", "body", "swipe", "right", "slide"],
  {"lowHz": 225, "highHz": 1600, "grainHz": 8, "grainDepth": 0.17, "air": 0.006, "body": 3.6},
  {"duration": 0.19, "apex": 0.3, "direction": 1, "travel": 0.84, "reverse": false, "echo": 0},
);
