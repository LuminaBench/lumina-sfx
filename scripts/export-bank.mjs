// Export the exact approved, QA-rendered master. Source DSP and bank stay independent.
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { execFile } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { ROOT } from './recipes.mjs';

const run = promisify(execFile);
const studioEncoder = join(homedir(), '.local/share/lumina-sfx/tools/ffmpeg');
const ffmpeg = process.env.FFMPEG_PATH || (existsSync(studioEncoder) ? studioEncoder : 'ffmpeg');
const output = process.env.LUMINA_QA_OUTPUT || join(ROOT, 'qa/output');
const bank = join(output, 'opus-bank');
const report = JSON.parse(await readFile(process.argv[2] || join(output, 'report-extremes-both-levels.json')));
const { sounds } = JSON.parse(await readFile(join(ROOT, 'catalog.json')));
const approved = new Map(report.results.map(r => [r.id,r]));
if (!report.pass || !report.profiles?.includes('balanced') || sounds.some(s => !approved.get(s.id)?.pass) || sounds.length !== approved.size) {
  throw new Error('Export requires a passing QA report covering the current catalog.');
}
const version = (await run(ffmpeg, ['-version'])).stdout.trim().split('\n');
await mkdir(bank, { recursive: true });
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const creditsFor = sound => [sound.recording, ...(sound.additionalRecordings || [])].filter(Boolean);
const recordingCredits = Object.fromEntries(sounds.flatMap(s => creditsFor(s).map(c => [c.url, c])));
const results = new Array(sounds.length);
let cursor = 0;
async function exportSound(sound) {
  const master = join(output, 'master-wav', sound.id + '.wav');
  const bytes = await readFile(master);
  const channels = bytes.readUInt16LE(22), frames = Math.round(sound.durationSec*44100);
  if (bytes.readUInt32LE(24) !== 44100 || channels !== approved.get(sound.id).channels ||
      bytes.length !== 44 + 2*frames*channels) throw new Error('Master mismatch: '+sound.id);
  const masterSha256 = digest(bytes);
  if (approved.get(sound.id).masterSha256 !== masterSha256) throw new Error('QA master checksum mismatch: '+sound.id);
  const temp = join(bank, sound.id+'.'+randomUUID()+'.opus');
  try {
    const encode = run(ffmpeg,['-v','error','-nostdin','-i','pipe:0','-c:a','libopus','-application','audio',
      '-vbr','on','-b:a',channels===2?'128k':'80k','-ar','48000','-fflags','+bitexact','-flags:a','+bitexact',temp]);
    encode.child.stdin.on('error', () => {});
    encode.child.stdin.end(bytes);
    await encode;
    const encoded = await readFile(temp);
    const head = encoded.indexOf('OpusHead');
    if (head < 0 || encoded[head+9] !== channels) throw new Error('Invalid Opus header: '+sound.id);
    const { stdout } = await run(ffmpeg,['-v','error','-nostdin','-i',temp,'-f','s16le','-ar','48000','pipe:1'],
      {encoding:'buffer', maxBuffer: Math.ceil(frames*48000/44100+2048)*channels*2});
    const decodedFrames = stdout.length/(channels*2);
    if (Math.abs(decodedFrames-frames*48000/44100)>2) throw new Error('Opus length mismatch: '+sound.id);
    const opusSha256 = digest(encoded);
    const file = sound.id+'-'+opusSha256.slice(0,16)+'.opus';
    await rename(temp,join(bank,file));
    const checks = approved.get(sound.id).variants[0].checks;
    const balancedGainDb = checks.stereoBalanced?.linkedGain ?? checks.balanced.gainDb;
    return { id:sound.id, name:sound.name, balancedGainDb, category:sound.category, channels, frames, loopable:sound.loopable,
      recordingUrls:creditsFor(sound).map(c => c.url), masterSha256, file,
      opusSha256, opusBytes:encoded.length, decodedFrames };
  } finally { await rm(temp,{ force:true }); }
}
await Promise.all(Array.from({length:5}, async () => {
  while (cursor<sounds.length) { const index=cursor++; results[index]=await exportSound(sounds[index]); }
}));
const hashes = new Map();
for (const entry of results) {
  if (hashes.has(entry.masterSha256)) throw new Error('Identical masters: '+entry.id+' and '+hashes.get(entry.masterSha256));
  hashes.set(entry.masterSha256,entry.id);
}
const temp = join(bank,'manifest.'+randomUUID()+'.tmp');
await writeFile(temp,JSON.stringify({ schemaVersion:1, sourceRate:44100, playbackRate:48000,
  seed:104729, profile:'original', encoder:{name:'libopus',ffmpegBuild:version}, recordingCredits, sounds:results },null,2)+'\n');
await rename(temp,join(bank,'manifest.json'));
console.log('Exported and decoded '+results.length+' verified Opus files in '+bank);
