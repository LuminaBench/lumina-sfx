import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, mkdtemp, link, rm, readFile, writeFile, rename, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { ffmpegPath, publishAsset } from './audio-export.mjs';

const run = promisify(execFile);
async function ff(args) {
  try {
    return await run(ffmpegPath(), ['-hide_banner', '-nostdin', ...args], { maxBuffer: 8 * 1024 * 1024 });
  } catch (e) {
    throw Error(
      e.code === 'ENOENT'
        ? 'Install FFmpeg or set FFMPEG_PATH to inspect or mix picture.'
        : String(e.stderr || e.message).slice(-2000),
    );
  }
}
async function mediaInfo(file, video) {
  const { stderr } = await ff([
    '-i',
    resolve(file),
    '-map',
    video ? '0:v:0' : '0:a:0',
    '-c',
    'copy',
    '-t',
    '0',
    '-f',
    'null',
    '-',
  ]);
  const head = stderr.split('Stream mapping:')[0],
    duration = head.match(/Duration:\s*(\d+):(\d+):([\d.]+)/);
  if (!duration) throw Error('Could not read finite media duration');
  const seconds = Number(duration[1]) * 3600 + Number(duration[2]) * 60 + Number(duration[3]);
  const frameRate = Number(head.match(/Video:[^\n]*?([\d.]+) fps/)?.[1]);
  const audioStreams = (head.match(/Stream #0:\d+[^\n]*?: Audio:/g) || []).length;
  return { seconds, nominalFps: frameRate || null, audioStreams };
}
export async function inspectPicture(file, out) {
  const info = await mediaInfo(file, true),
    dest = resolve(out);
  await mkdir(dirname(dest), { recursive: true });
  try {
    await stat(dest);
    throw Error('Choose a new inspection directory');
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  const stage = await mkdtemp(join(dirname(dest), '.lumina-picture-'));
  try {
    const n = Math.min(24, Math.max(1, Math.ceil(info.seconds * 2))),
      interval = info.seconds / n;
    // Address the original presentation clock. This preserves irregular frame timing in screen recordings.
    const vf =
      'setpts=PTS-STARTPTS,select=if(isnan(prev_selected_t)\\,1\\,gte(t-prev_selected_t\\,' +
      Math.max(0.001, interval - 0.012) +
      ')),showinfo,scale=320:180:force_original_aspect_ratio=decrease,pad=320:180:(ow-iw)/2:(oh-ih)/2,tile=4x' +
      Math.ceil(n / 4);
    const { stderr } = await ff([
      '-i',
      resolve(file),
      '-an',
      '-vf',
      vf,
      '-frames:v',
      '1',
      '-q:v',
      '3',
      join(stage, 'storyboard.jpg'),
    ]);
    const frameTimes = Array.from(
      stderr.matchAll(/\bn:\s*\d+\s+pts:\s*-?\d+\s+pts_time:\s*([\d.e+-]+)/g),
      (m) => Number(m[1]),
    ).slice(0, 4 * Math.ceil(n / 4));
    if (!frameTimes.length) throw Error('No picture frames were inspected');
    if (info.audioStreams)
      await ff([
        '-v',
        'error',
        '-i',
        resolve(file),
        '-map',
        '0:a:0',
        '-vn',
        '-ac',
        '2',
        '-c:a',
        'aac',
        '-b:a',
        '128k',
        join(stage, 'original-audio.m4a'),
      ]);
    const report = {
      ...info,
      frameTimes,
      storyboard: 'storyboard.jpg',
      originalAudio: info.audioStreams ? 'original-audio.m4a' : null,
    };
    await writeFile(join(stage, 'picture.json'), JSON.stringify(report, null, 2) + '\n');
    await rename(stage, dest);
    return report;
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}
export async function mixPicture(file, stem, out, audioStream = 0) {
  const [picture, audio] = await Promise.all([mediaInfo(file, true), mediaInfo(stem, false)]);
  if (Math.abs(picture.seconds - audio.seconds) > Math.max(0.055, 1.1 / (picture.nominalFps || 24)))
    throw Error('Stem and picture duration differ. Check the project frame rate.');
  if (
    !Number.isSafeInteger(audioStream) ||
    audioStream < 0 ||
    audioStream >= Math.max(1, picture.audioStreams)
  )
    throw Error('Unknown original audio stream');
  const dest = resolve(out);
  await mkdir(dirname(dest), { recursive: true });
  const stage = await mkdtemp(join(dirname(dest), '.lumina-mix-')),
    video = join(stage, 'preview.mp4');
  try {
    const args = ['-v', 'error', '-i', resolve(file), '-i', resolve(stem), '-map', '0:v:0'];
    if (picture.audioStreams) {
      args.push(
        '-filter_complex',
        '[0:a:' +
          audioStream +
          ']aresample=48000:async=1:first_pts=0,apad[original];[original][1:a:0]amix=inputs=2:normalize=0:duration=shortest,alimiter=limit=0.97:level=false:latency=true[mix]',
        '-map',
        '[mix]',
      );
    } else args.push('-map', '1:a:0');
    const encode = (codec) =>
      ff([
        ...args,
        '-t',
        String(picture.seconds),
        ...codec,
        '-c:a',
        'aac',
        '-b:a',
        '256k',
        '-movflags',
        '+faststart',
        video,
      ]);
    let pictureEncoding = 'copy';
    try {
      await encode(['-c:v', 'copy']);
    } catch (error) {
      if (
        !/codec .*not currently supported|Could not find tag|incompatible with output codec/i.test(
          error.message,
        )
      )
        throw error;
      await rm(video, { force: true });
      await encode(['-c:v', 'libx264', '-crf', '18', '-preset', 'fast', '-pix_fmt', 'yuv420p']);
      pictureEncoding = 'h264';
    }
    await link(video, dest);
    return {
      file: dest,
      pictureEncoding,
      originalTracks: picture.audioStreams,
      usedAudioStream: picture.audioStreams ? audioStream : null,
      seconds: picture.seconds,
    };
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}

// One picture and a common transport, so an A/B switch never moves the viewer to another beat.
export async function comparePictures(a, b, out, c, ballot) {
  const files = [a, b, ...(c ? [c] : [])];
  const [first, ...others] = await Promise.all(files.map((f) => mediaInfo(f, true)));
  if (others.some((x) => Math.abs(first.seconds - x.seconds) > 0.055))
    throw Error('Compare two mixes of the same cut and duration');
  const local = (file) =>
    relative(dirname(resolve(out)), resolve(file))
      .split(sep)
      .map((s) => encodeURIComponent(s))
      .join('/');

  const template = await readFile(new URL('../references/edit-comparison.html', import.meta.url), 'utf8');
  await publishAsset(
    resolve(out),
    Buffer.from(
      template
        .replace('<!--BALLOT-->', JSON.stringify(ballot ?? null).replaceAll('<', '\\u003c'))
        .replace('<!--MIXES-->', JSON.stringify(files.map(local)).replaceAll('<', '\\u003c')),
    ),
  );
  return { file: resolve(out), duration: first.seconds };
}
