import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "velvet-page-wipe", "Velvet page wipe",
  ["transition", "whoosh", "launch", "video", "muted", "felt", "cloth", "wipe", "page", "unfold"],
  {"lowHz": 280, "highHz": 1800, "grainHz": 20, "grainDepth": 0.19, "air": 0.008, "body": 4.2},
  {"duration": 0.42, "apex": 0.59, "direction": -1, "travel": 0.55, "reverse": true, "echo": 0.045},
);
