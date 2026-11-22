import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "velvet-title-rise", "Velvet title rise",
  ["transition", "whoosh", "launch", "video", "muted", "felt", "cloth", "riser", "typography", "title"],
  {"lowHz": 280, "highHz": 1800, "grainHz": 20, "grainDepth": 0.19, "air": 0.008, "body": 4.2},
  {"duration": 0.72, "apex": 0.82, "direction": 0, "travel": 0, "reverse": false, "echo": 0.08},
);
