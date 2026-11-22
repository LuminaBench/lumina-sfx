import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "tracing-paper-swipe-right", "Tracing paper rightward swipe",
  ["transition", "whoosh", "launch", "video", "paper", "dry", "thin", "swipe", "right", "slide"],
  {"lowHz": 1450, "highHz": 6400, "grainHz": 132, "grainDepth": 0.63, "air": 0.075, "body": 0.98},
  {"duration": 0.19, "apex": 0.3, "direction": 1, "travel": 0.84, "reverse": false, "echo": 0},
);
