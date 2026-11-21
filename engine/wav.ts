import { SAMPLE_RATE } from './render.ts';

export function encodeWav(input: Float32Array | readonly Float32Array[], sampleRate = SAMPLE_RATE): ArrayBuffer {
  const channels = input instanceof Float32Array ? [input] : input;
  if (![1, 2].includes(channels.length) || channels.some(c => c.length !== channels[0].length)) {
    throw new Error('Expected one or two equal-length PCM channels');
  }
  const frames = channels[0].length;
  const stride = channels.length * 2;
  const wav = new ArrayBuffer(44 + frames * stride);
  const view = new DataView(wav);
  const ascii = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i));
  };
  ascii(0, 'RIFF');
  view.setUint32(4, wav.byteLength - 8, true);
  ascii(8, 'WAVE');
  ascii(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels.length, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * stride, true);
  view.setUint16(32, stride, true);
  view.setUint16(34, 16, true);
  ascii(36, 'data');
  view.setUint32(40, frames * stride, true);
  for (let i = 0; i < frames; i++) {
    for (let ch = 0; ch < channels.length; ch++) {
      const sample = Math.max(-1, Math.min(1, channels[ch][i]));
      view.setInt16(44 + i * stride + 2 * ch, Math.round(sample * (sample < 0 ? 32768 : 32767)), true);
    }
  }
  return wav;
}
