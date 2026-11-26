import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { resolve } from 'node:path';
import { ffmpegPath } from './audio-export.mjs';

// Stereo energy, including anti-phase content. Store a pair of numbers per 50 ms,
// not decoded PCM for an entire movie. Frame zero uses the source presentation clock.
export async function measureTrack(file, stream = 0) {
  if (!Number.isSafeInteger(stream) || stream < 0) throw Error('Invalid original audio stream');
  const proc = spawn(
    ffmpegPath(),
    [
      '-nostdin',
      '-hide_banner',
      '-v',
      'error',
      '-copyts',
      '-start_at_zero',
      '-i',
      resolve(file),
      '-map',
      '0:a:' + stream,
      '-vn',
      '-af',
      'aresample=12000:async=1:first_pts=0',
      '-ac',
      '2',
      '-ar',
      '12000',
      '-f',
      's16le',
      'pipe:1',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] },
  );
  // Register a rejection handler immediately, including when the binary is missing.
  const done = once(proc, 'close').then(
    ([status]) => ({ status }),
    (error) => ({ error }),
  );
  let error = '',
    spare = Buffer.alloc(0),
    sum = 0,
    peak = 0,
    count = 0;
  proc.stderr.on('data', (b) => {
    error = (error + b).slice(-1500);
  });
  const windows = [];
  const flush = () => {
    windows.push({ energy: sum / count, peak });
    sum = 0;
    peak = 0;
    count = 0;
  };
  for await (const chunk of proc.stdout) {
    const buf = spare.length ? Buffer.concat([spare, chunk]) : chunk;
    const end = buf.length - (buf.length % 2);
    for (let i = 0; i < end; i += 2) {
      const x = buf.readInt16LE(i) / 32768;
      sum += x * x;
      peak = Math.max(peak, Math.abs(x));
      count++;
      if (count === 1200) flush();
    }
    spare = buf.subarray(end);
  }
  const closed = await done;
  if (closed.error) throw closed.error;
  if (closed.status) {
    if (stream === 0 && /matches no streams|does not contain any stream/.test(error))
      return { windowSec: 0.05, windows: [] };
    throw Error(error || 'Original audio decode failed');
  }
  if (count) flush();
  return { windowSec: 0.05, windows };
}
