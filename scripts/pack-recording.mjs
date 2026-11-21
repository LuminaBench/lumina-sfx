#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    title: { type: 'string' },
    author: { type: 'string' },
    url: { type: 'string' },
    license: { type: 'string' },
    'verified-on': { type: 'string' },
  },
});

function pcm16(bytes) {
  if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error('Expected an edited mono 16-bit PCM WAV file');
  }
  let rate = 0;
  let data;
  for (let offset = 12; offset + 8 <= bytes.length;) {
    const size = bytes.readUInt32LE(offset + 4);
    const start = offset + 8;
    const end = start + size;
    if (end > bytes.length) throw new Error('Truncated WAV chunk');
    const chunk = bytes.toString('ascii', offset, offset + 4);
    if (chunk === 'fmt ') {
      if (size < 16 || bytes.readUInt16LE(start) !== 1 || bytes.readUInt16LE(start + 2) !== 1 ||
          bytes.readUInt16LE(start + 14) !== 16) throw new Error('Expected mono 16-bit linear PCM');
      rate = bytes.readUInt32LE(start + 4);
    } else if (chunk === 'data') {
      data = bytes.subarray(start, end);
    }
    offset = end + (size % 2);
  }
  if (!rate || !data?.length || data.length % 2) throw new Error('Invalid PCM format or data length');
  return { rate, data };
}

try {
  const { title, author, url, license } = values;
  const verifiedOn = values['verified-on'];
  if (!title || !author || !url || new URL(url).protocol !== 'https:' ||
      !['CC0-1.0', 'Public Domain'].includes(license) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(verifiedOn ?? '') || !positionals.length) {
    throw new Error('Usage: pack-recording.mjs --title NAME --author NAME --url HTTPS_URL --license CC0-1.0 --verified-on YYYY-MM-DD <take.wav>…');
  }
  const takes = await Promise.all(positionals.map(async (file) => pcm16(await readFile(file))));
  const sampleRate = takes[0].rate;
  if (takes.some((take) => take.rate !== sampleRate)) throw new Error('Use the same sample rate for all takes');

  console.log("import type { RecordedClip } from '../../engine/recording.ts';\n");
  console.log('export default {');
  console.log(`  credit: ${JSON.stringify({ title, author, url, license, verifiedOn })},`);
  console.log(`  sampleRate: ${sampleRate},`);
  console.log('  takes: [');
  for (const take of takes) {
    const lines = take.data.toString('base64').match(/.{1,112}/g);
    console.log("    [");
    console.log(lines.map((line) => `      '${line}',`).join('\n'));
    console.log("    ].join(''),");
  }
  console.log('  ],\n} satisfies RecordedClip;');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
