import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "velvet-swipe-right", "Velvet rightward swipe",
  ["transition", "whoosh", "launch", "video", "muted", "felt", "cloth", "swipe", "right", "slide"],
  {"lowHz": 280, "highHz": 1800, "grainHz": 20, "grainDepth": 0.19, "air": 0.008, "body": 4.2},
  {"duration": 0.19, "apex": 0.3, "direction": 1, "travel": 0.84, "reverse": false, "echo": 0},
);
