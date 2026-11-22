import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "soft-air-swipe-right", "Soft air rightward swipe",
  ["transition", "whoosh", "launch", "video", "quiet", "airy", "diffuse", "swipe", "right", "slide"],
  {"lowHz": 395, "highHz": 2170, "grainHz": 4, "grainDepth": 0.08, "air": 0.036, "body": 3.55},
  {"duration": 0.19, "apex": 0.3, "direction": 1, "travel": 0.84, "reverse": false, "echo": 0},
);
