// Inventory the actual PCM embedded in each runtime module. Works offline.
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const directory = new URL('../recipes/_recordings/', import.meta.url);
const sources = [];
const files = (await readdir(directory)).filter(name => name.endsWith('.ts')).sort();
const reviewed = new Set(files.filter(name => name.startsWith('reviewed-')));
for (const name of files) {
  const { default: clip } = await import(new URL(name, directory));
  const takes = clip.takes.map((base64) => {
    const pcm = Buffer.from(base64, 'base64');
    if (!pcm.length || pcm.length % 2) throw Error('Invalid PCM in ' + name);
    return { frames: pcm.length / 2, sha256: createHash('sha256').update(pcm).digest('hex') };
  });
  const supersededBy = reviewed.has('reviewed-' + name) ? 'recipes/_recordings/reviewed-' + name : undefined;
  sources.push({ file: 'recipes/_recordings/' + name, supersededBy, ...clip.credit, sampleRate: clip.sampleRate, takes });
}
const folder = new URL('../sources/', import.meta.url);
await mkdir(folder, { recursive: true });
await writeFile(
  new URL('recordings.json', folder),
  JSON.stringify({ format: 'mono signed PCM16 little-endian', sources }, null, 2) + '\n',
);
console.log('Indexed ' + sources.length + ' self-contained recording modules');
