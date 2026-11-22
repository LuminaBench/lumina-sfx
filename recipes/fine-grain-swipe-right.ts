import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "fine-grain-swipe-right", "Fine grain rightward swipe",
  ["transition", "whoosh", "launch", "video", "sand", "textured", "grit", "swipe", "right", "slide"],
  {"lowHz": 1150, "highHz": 6700, "grainHz": 323, "grainDepth": 0.78, "air": 0.11, "body": 1.22},
  {"duration": 0.19, "apex": 0.3, "direction": 1, "travel": 0.84, "reverse": false, "echo": 0},
);
