// Audio delivery uses the exact master that passed QA. Keep compressed delivery optional.
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { link, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { homedir, tmpdir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
export const digest = bytes => createHash('sha256').update(bytes).digest('hex');

export async function publishAsset(path, bytes) {
  await mkdir(dirname(path), { recursive: true });
  const stage = await mkdtemp(join(dirname(path), '.lumina-'));
  const staged = join(stage, basename(path));
  try {
    await writeFile(staged, bytes);
    try {
      await link(staged, path);
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      if (!(await readFile(path)).equals(Buffer.from(bytes))) throw Error('File has local changes: ' + path);
    }
    if (digest(await readFile(path)) !== digest(bytes)) throw Error('File verification failed: ' + path);
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}

export function ffmpegPath() {
  const local = join(homedir(), '.local/share/lumina-sfx/tools/ffmpeg');
  return process.env.FFMPEG_PATH || (existsSync(local) ? local : 'ffmpeg');
}
// Frames an Ogg Vorbis stream declares: the granule position of its last page.
// Players trim to it. FFmpeg's decoder does not always do so on short streams.
export function oggFinalGranule(bytes) {
  for (let at = bytes.lastIndexOf('OggS'); at >= 0; at = at ? bytes.lastIndexOf('OggS', at - 1) : -1) {
    if (at + 14 > bytes.length || bytes[at + 4] !== 0) continue;
    const granule = bytes.readBigInt64LE(at + 6);
    if (granule >= 0n) return Number(granule);
  }
  throw Error('Ogg stream has no final granule position');
}
export async function encodeDelivery(wav, format) {
  if (format === 'wav') return wav;
  if (!['opus', 'ogg'].includes(format)) throw Error('Unknown audio format: ' + format);
  const ffmpeg = ffmpegPath();
  const temp = await mkdtemp(join(tmpdir(), 'lumina-encode-'));
  try {
    const source = join(temp, 'master.wav'), output = join(temp, 'delivery.' + format);
    const channels = wav.readUInt16LE(22), rate = wav.readUInt32LE(24);
    const frames = (wav.length - 44) / (2 * channels);
    await writeFile(source, wav);
    const codec = format === 'ogg' ? ['-c:a', 'libvorbis', '-q:a', '6'] : ['-c:a', 'libopus', '-b:a', channels === 2 ? '128k' : '80k'];
    for (const trimDb of [1.5, 3, 6]) {
      await run(ffmpeg, ['-nostdin', '-v', 'error', '-y', '-i', source, '-map_metadata', '-1', '-af', 'volume=-' + trimDb + 'dB', ...codec,
        '-fflags', '+bitexact', '-flags:a', '+bitexact', output]);
      const { stdout } = await run(ffmpeg, ['-v','error','-i',output,'-ar',String(rate),'-f','f32le','pipe:1'],
        { encoding: 'buffer', maxBuffer: (frames + 8192) * channels * 4 });
      // Opus signals its exact end to the decoder. For Vorbis, check the length the stream
      // declares: FFmpeg can drop the first block or skip the end trim of a short stream.
      const declared = format === 'ogg' ? oggFinalGranule(await readFile(output)) : stdout.length / (4 * channels);
      if (Math.abs(declared - frames) > 2) throw Error('Decoded duration differs from master');
      let peak = 0;
      for (let i = 0; i < stdout.length; i += 4) peak = Math.max(peak, Math.abs(stdout.readFloatLE(i)));
      if (peak > 0 && peak <= 10 ** (-0.5/20)) return await readFile(output);
    }
    throw Error('Lossy delivery exceeds peak ceiling after decoding');
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
}
