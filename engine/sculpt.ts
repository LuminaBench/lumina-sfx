import { biquad, closeLoop } from './dsp.ts';
import type { DesignMacros, RenderContext, ResolvedOptions, SoundRecipe } from './types.ts';

export const macroControls = {
  punch: { min: 0, max: 1, default: 0 },
  size: { min: 0, max: 1, default: 0.5 },
  distance: { min: 0, max: 1, default: 0 },
  space: { values: ['dry', 'small_room', 'hallway', 'outdoor', 'cavern'], default: 'dry' },
  grit: { min: 0, max: 1, default: 0 },
  speed: { min: 0.25, max: 4, default: 1 },
  pitchShift: { min: -24, max: 24, default: 0 },
} as const;

const defaults: Required<DesignMacros> = {
  punch: 0,
  size: 0.5,
  distance: 0,
  space: 'dry',
  grit: 0,
  speed: 1,
  pitchShift: 0,
};

export function resolveMacros(macros: DesignMacros = {}): Required<DesignMacros> {
  for (const [key, value] of Object.entries(macros)) {
    if (!Object.hasOwn(macroControls, key)) throw new RangeError('Unknown macro: ' + key);
    const spec = macroControls[key as keyof DesignMacros];
    if ('values' in spec) {
      if (!spec.values.some((v) => v === value)) throw new RangeError('Unknown acoustic space: ' + value);
    } else if (typeof value !== 'number' || !Number.isFinite(value) || value < spec.min || value > spec.max) {
      throw new RangeError(key + ' must be between ' + spec.min + ' and ' + spec.max);
    }
  }
  return { ...defaults, ...macros };
}

// Reflection delays in seconds, signed reflection gains and audible release.
const spaces = {
  dry: { taps: [], tail: 0 },
  small_room: {
    taps: [
      [0.009, 0.31],
      [0.017, -0.22],
      [0.028, 0.16],
      [0.043, 0.08],
    ],
    tail: 0.16,
  },
  hallway: {
    taps: [
      [0.021, 0.36],
      [0.044, 0.27],
      [0.069, -0.21],
      [0.094, 0.13],
    ],
    tail: 0.34,
  },
  outdoor: {
    taps: [
      [0.063, 0.18],
      [0.149, -0.11],
      [0.226, 0.07],
    ],
    tail: 0.35,
  },
  cavern: {
    taps: [
      [0.059, 0.36],
      [0.109, -0.3],
      [0.187, 0.24],
      [0.269, 0.19],
    ],
    tail: 0.95,
  },
} as const;

function duration(recipe: SoundRecipe, m: Required<DesignMacros>) {
  return recipe.durationSec / m.speed + (recipe.loopable ? 0 : spaces[m.space].tail + 0.24 * m.distance);
}

export function renderDurationSec(recipe: SoundRecipe, override?: DesignMacros): number {
  if (!recipe.macros && !override) return recipe.durationSec;
  return duration(recipe, resolveMacros({ ...recipe.macros, ...override }));
}

function sampleAt(source: Float32Array, at: number, loop: boolean) {
  if (loop) at = ((at % source.length) + source.length) % source.length;
  if (at < 0 || at >= source.length) return 0;
  const i = Math.floor(at);
  const next = source[i + 1] ?? (loop ? source[0] : 0);
  return source[i] + (at - i) * (next - source[i]);
}

// Waveform-similarity overlap-add: align each new grain to the preceding
// waveform near its intended time. One set of positions preserves stereo phase.
function grainPositions(
  reference: Float32Array,
  frames: number,
  rate: number,
  pitch: number,
  speed: number,
  loop: boolean,
) {
  const hop = Math.max(1, Math.round(rate * 0.024));
  const starts = new Float64Array(Math.ceil(frames / hop));
  if (speed === pitch) return starts;
  const radius = Math.round(rate * 0.005);
  const step = Math.max(1, Math.round(rate / 11025));
  const probes = 32;
  for (let n = 1; n < starts.length; n++) {
    const expected = n * hop * speed;
    if (!loop && expected >= reference.length) {
      starts[n] = expected;
      continue;
    }
    const previous = starts[n - 1] + hop * pitch;
    const target = Array.from({ length: probes }, (_, i) =>
      sampleAt(reference, previous + (i * hop * pitch) / probes, loop),
    );
    function score(at: number) {
      let product = 0,
        energy = 1e-12;
      for (let i = 0; i < probes; i++) {
        const x = sampleAt(reference, at + (i * hop * pitch) / probes, loop);
        product += target[i] * x;
        energy += x * x;
      }
      return product / Math.sqrt(energy);
    }
    let best = expected,
      quality = score(expected);
    const lo = Math.max(0, Math.round(expected - radius));
    const hi = Math.round(expected + radius);
    for (let at = lo; at <= hi; at += step) {
      const similarity = score(at);
      if (similarity > quality) {
        quality = similarity;
        best = at;
      }
    }
    const coarse = best;
    for (let at = Math.max(lo, coarse - step + 1); at <= Math.min(hi, coarse + step - 1); at++) {
      const similarity = score(at);
      if (similarity > quality) {
        quality = similarity;
        best = at;
      }
    }
    starts[n] = best;
  }
  return starts;
}

function shape(
  input: Float32Array,
  ctx: RenderContext,
  m: Required<DesignMacros>,
  loop: boolean,
  starts: Float64Array,
) {
  const rate = ctx.sampleRate;
  const pitch = 2 ** (m.pitchShift / 12);
  const source = pitch > 1 ? input.map(biquad('lowpass', (rate * 0.43) / pitch, 0.707, rate)) : input;
  const hop = Math.max(1, Math.round(rate * 0.024));
  const out = new Float32Array(ctx.frames);
  for (let i = 0; i < out.length; i++) {
    if (!loop && i >= input.length / m.speed) break;
    if (pitch === m.speed) {
      out[i] = sampleAt(source, i * pitch, loop);
      continue;
    }
    const grain = Math.floor(i / hop),
      offset = i % hop;
    const current = sampleAt(source, starts[grain] + offset * pitch, loop);
    if (!grain) {
      out[i] = current;
      continue;
    }
    const previous = sampleAt(source, starts[grain - 1] + (hop + offset) * pitch, loop);
    const weight = 0.5 - 0.5 * Math.cos((Math.PI * offset) / hop);
    out[i] = previous + weight * (current - previous);
  }
  const bass = biquad('lowpass', 200, 0.71, rate);
  const air = biquad('lowpass', Math.min(rate * 0.45, 18000 * 0.053 ** m.distance), 0.71, rate);
  const fast = 1 - Math.exp(-1 / (rate * 0.0013)),
    slow = 1 - Math.exp(-1 / (rate * 0.028));
  let attack = 0,
    body = 0;
  for (let i = 0; i < out.length; i++) {
    let x = out[i];
    if (m.size !== 0.5) x += (m.size - 0.5) * 1.8 * bass(x);
    if (m.punch) {
      attack += fast * (Math.abs(x) - attack);
      body += slow * (Math.abs(x) - body);
      x *= 1 + ((m.punch * Math.max(0, attack - body)) / (attack + 0.005)) * 2;
    }
    if (m.grit) x = (1 - m.grit) * x + m.grit * Math.tanh(x * (1 + 5 * m.grit));
    out[i] = m.distance ? air(x) * (1 - 0.34 * m.distance) : x;
  }
  if (m.space === 'dry' && !m.distance) return out;
  const reflected = out.slice();
  const reflections: [number, number][] = spaces[m.space].taps.map(([time, gain]) => [time, gain]);
  if (m.distance) reflections.push([0.042 + 0.11 * m.distance, 0.38 * m.distance]);
  for (const [time, gain] of reflections) {
    const delay = Math.max(1, Math.round(time * rate));
    const damp = biquad('lowpass', 3500 / (1 + m.distance), 0.71, rate);
    const memory = new Float32Array(delay);
    const decay = Math.max(0.05, spaces[m.space].tail + 0.24 * m.distance);
    const feedback = 0.004 ** (time / decay);
    for (let i = 0; i < out.length; i++) {
      const j = i % delay,
        echo = damp(memory[j]);
      memory[j] = out[i] + feedback * echo;
      reflected[i] += gain * echo;
    }
  }
  return reflected;
}

export function designedRecipe(base: SoundRecipe, override?: DesignMacros): SoundRecipe {
  if (!base.macros && !override) return base;
  const m = resolveMacros({ ...base.macros, ...override });
  if (Object.entries(defaults).every(([k, v]) => m[k as keyof DesignMacros] === v)) return base;
  function render(ctx: RenderContext, opts: ResolvedOptions, stereo: boolean) {
    const n = Math.round(base.durationSec * ctx.sampleRate);
    const extra = base.loopable ? Math.min(Math.round(0.075 * ctx.sampleRate), n >> 2) : 0;
    const sourceCtx = { ...ctx, frames: n + extra };
    const channels =
      stereo && base.renderStereo ? base.renderStereo(sourceCtx, opts) : [base.render(sourceCtx, opts)];
    const sources = channels.map((c) => {
      if (c.length !== sourceCtx.frames) throw Error('Invalid source length: ' + base.id);
      return extra ? closeLoop(c, n, extra) : c;
    });
    const starts = grainPositions(
      sources[0],
      ctx.frames,
      ctx.sampleRate,
      2 ** (m.pitchShift / 12),
      m.speed,
      base.loopable,
    );
    return sources.map((c) => shape(c, ctx, m, base.loopable, starts));
  }
  return {
    ...base,
    macros: undefined,
    durationSec: duration(base, m),
    render: (ctx, opts) => render(ctx, opts, false)[0],
    renderStereo: base.renderStereo
      ? (ctx, opts) => {
          const [left, right] = render(ctx, opts, true);
          return [left, right];
        }
      : undefined,
  };
}
