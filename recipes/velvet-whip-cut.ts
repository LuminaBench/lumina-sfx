import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "velvet-whip-cut", "Velvet whip cut",
  ["transition", "whoosh", "launch", "video", "muted", "felt", "cloth", "fast", "cut", "whip", "pan"],
  {"lowHz": 280, "highHz": 1800, "grainHz": 20, "grainDepth": 0.19, "air": 0.008, "body": 4.2},
  {"duration": 0.12, "apex": 0.16, "direction": 1, "travel": 0.9, "reverse": true, "echo": 0},
);
