import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "fine-grain-title-rise", "Fine grain title rise",
  ["transition", "whoosh", "launch", "video", "sand", "textured", "grit", "riser", "typography", "title"],
  {"lowHz": 1150, "highHz": 6700, "grainHz": 323, "grainDepth": 0.78, "air": 0.11, "body": 1.22},
  {"duration": 0.72, "apex": 0.82, "direction": 0, "travel": 0, "reverse": false, "echo": 0.08},
);
