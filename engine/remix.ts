import { biquad } from './dsp.ts';
import { renderChannels } from './render.ts';
import { renderDurationSec, resolveMacros } from './sculpt.ts';
import type {
  DesignMacros,
  RenderContext,
  ResolvedOptions,
  SoundParameter,
  SoundRecipe,
  SpectralExpectation,
} from './types.ts';

type Curve = readonly (readonly [number, number])[];

function validateCurve(points: Curve, duration: number, ceiling: number) {
  if (!Array.isArray(points)) throw Error('Expected envelope points');
  let previous = -1;
  for (const point of points) {
    if (!Array.isArray(point) || point.length !== 2) throw Error('Use [seconds, value] envelope points');
    const [time, value] = point;
    if (
      !Number.isFinite(time) ||
      time <= previous ||
      time < 0 ||
      time > duration ||
      !Number.isFinite(value) ||
      value < 0 ||
      value > ceiling
    )
      throw Error('Invalid envelope point');
    previous = time;
  }
}

// Each renderer traverses its automation once in chronological order.
function automation(points: Curve, power: boolean) {
  let segment = 0;
  return (time: number) => {
    while (segment + 1 < points.length && points[segment + 1][0] <= time) segment++;
    const [start, a] = points[segment];
    const next = points[segment + 1];
    if (!next || time <= start) return a;
    const fraction = (time - start) / (next[0] - start);
    const b = next[1];
    return power ? Math.sqrt(a * a + fraction * (b * b - a * a)) : a + fraction * (b - a);
  };
}

export interface RemixLayer {
  recipe: SoundRecipe;
  fromMarker?: string;
  label?: string;
  fitSec?: number;
  afterLayer?: { layer: number | string; shiftSec?: number };
  atMarker?: { layer: number | string; name: string; shiftSec?: number };
  durationSec?: number;
  envelope?: Curve;
  muffle?: { cutoffHz: number; envelope: Curve };
  macros?: Readonly<DesignMacros>;
  gain?: number;
  offsetSec?: number;
  params?: Readonly<Record<string, number>>;
}
export const sceneStyles = {
  natural: {},
  cinematic: { size: 0.68, punch: 0.21, space: 'outdoor_open', wetness: 0.24 },
  arcade: { punch: 0.42, speed: 1.09, grit: 0.06 },
} as const;
export interface RemixDesign {
  style?: keyof typeof sceneStyles;
  id: string;
  name?: string;
  spectrum?: readonly SpectralExpectation[];
  macros?: Readonly<DesignMacros>;
}

export function composeRecipe(design: RemixDesign, layers: readonly RemixLayer[]): SoundRecipe {
  if (typeof design.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(design.id))
    throw Error('Use a lowercase hyphenated remix ID');
  if (!layers.length || layers.length > 4) throw Error('A remix uses one to four layers');
  if (design.style !== undefined && !Object.hasOwn(sceneStyles, design.style)) throw Error('Unknown scene style');
  const styling = design.style ? { ...sceneStyles[design.style], ...design.macros } : design.macros;
  resolveMacros(styling);
  for (const target of design.spectrum ?? []) {
    if (
      !['high', 'sub'].includes(target.band) ||
      !Number.isFinite(target.minShare) ||
      target.minShare < 0 ||
      target.minShare > 1
    ) {
      throw Error('Spectral targets require band high or sub and a minimum energy share in [0,1]');
    }
  }
  const params: Record<string, SoundParameter> = {};
  const first = layers[0].recipe;
  const paramKey = (index: number, key: string) => (layers.length === 1 ? key : 'layer' + (index + 1) + '_' + key);
  const positions: { offset: number; start: number; speed: number; length: number }[] = [];
  const labels = new Map<string, number>();
  function earlierLayer(ref: string | number, index: number) {
    const n = typeof ref === 'string' ? labels.get(ref) : ref - 1;
    if (n === undefined || !Number.isInteger(n) || n < 0 || n >= index)
      throw Error('Anchor must reference an earlier layer');
    return n;
  }
  const tracks = layers.map(
    (
      {
        recipe,
        macros,
        gain = 1,
        offsetSec,
        label,
        atMarker,
        afterLayer,
        fitSec,
        fromMarker,
        durationSec: span,
        envelope = [],
        muffle,
        params: overrides = {},
      },
      index,
    ) => {
      if (label !== undefined) {
        if (typeof label !== 'string' || !/^[a-z][a-z0-9-]*$/.test(label) || /^layer[0-9]+$/.test(label) || labels.has(label))
          throw Error('Expected a unique lowercase layer label');
        labels.set(label, index);
      }
      if (atMarker !== undefined || afterLayer !== undefined) {
        if (offsetSec !== undefined || (atMarker !== undefined && afterLayer !== undefined))
          throw Error('Choose one earlier-layer anchor or an explicit offset');
        const anchor = atMarker ?? afterLayer;
        if (!anchor || typeof anchor !== 'object') throw Error('Invalid layer anchor');
        const source = earlierLayer(anchor.layer, index);
        const reference = positions[source];
        const shift = anchor.shiftSec ?? 0;
        if (!Number.isFinite(shift)) throw Error('Invalid anchor shift');
        let relative = reference.length;
        if (atMarker) {
          const marker = layers[source].recipe.markers?.[atMarker.name];
          if (typeof marker !== 'number' || !Number.isFinite(marker)) throw Error('Unknown anchor marker');
          relative = marker / reference.speed - reference.start;
          if (relative < 0 || relative >= reference.length) throw Error('Anchor outside selected layer window');
        } else if (layers[source].recipe.loopable && layers[source].durationSec === undefined && layers[source].fitSec === undefined) {
          throw Error('Bound the loop before anchoring to its end');
        }
        offsetSec = reference.offset + relative + shift;
      }
      offsetSec ??= 0;
      if (!Number.isFinite(gain) || gain < 0 || gain > 4) throw Error('Layer gain must be in [0,4]');
      if (!Number.isFinite(offsetSec) || offsetSec < 0) throw Error('Expected non-negative layer offset');
      for (const [key, value] of Object.entries(overrides)) {
        const spec = Object.hasOwn(recipe.params, key) && recipe.params[key];
        if (!spec || !Number.isFinite(value) || value < spec.min || value > spec.max) {
          throw Error(recipe.id + ': unknown or out-of-range DSP parameter ' + key);
        }
      }
      for (const [key, spec] of Object.entries(recipe.params)) {
        params[paramKey(index, key)] = { ...spec, default: overrides[key] ?? spec.default };
      }
      resolveMacros(macros);
      const marker = fromMarker === undefined ? 0 : recipe.markers?.[fromMarker];
      if (typeof marker !== 'number' || !Number.isFinite(marker) || marker < 0 || marker >= recipe.durationSec)
        throw Error(recipe.id + ': invalid source marker ' + fromMarker);
      if (fitSec !== undefined) {
        if (!Number.isFinite(fitSec) || fitSec <= 0 || span !== undefined || macros?.speed !== undefined)
          throw Error('Use a positive fitSec without durationSec or an explicit speed');
        const tail = renderDurationSec(recipe, { ...macros, speed: 1 }) - recipe.durationSec;
        const fittedSpeed = (recipe.durationSec - marker) / (fitSec - tail);
        if (!(fittedSpeed >= 0.25 && fittedSpeed <= 4))
          throw Error('fitSec exceeds the available stretch range including the room tail');
        macros = { ...macros, speed: fittedSpeed };
        span = fitSec;
      }
      const speed = macros?.speed ?? recipe.macros?.speed ?? 1;
      const start = marker / speed;
      const remaining = renderDurationSec(recipe, macros) - start;
      if (
        span !== undefined &&
        (!Number.isFinite(span) || span <= 0 || (!recipe.loopable && span > remaining + 1e-8))
      )
        throw Error(recipe.id + ': invalid layer duration');
      const length = span ?? remaining;
      positions.push({ offset: offsetSec, start, speed, length });
      const limit = recipe.loopable && span === undefined ? 120 : length;
      validateCurve(envelope, limit, 4);
      if (muffle !== undefined) {
        if (
          !muffle ||
          !Number.isFinite(muffle.cutoffHz) ||
          muffle.cutoffHz < 40 ||
          muffle.cutoffHz > 20000 ||
          !muffle.envelope?.length
        )
          throw Error('Invalid muffle filter or envelope');
        validateCurve(muffle.envelope, limit, 1);
      }
      return { recipe, gain, offsetSec, macros, start, length, span, envelope, muffle };
    },
  );
  if (
    !tracks.some(
      (t) => t.gain > 0 && t.offsetSec === 0 && (!t.envelope.length || t.envelope.some((point) => point[1] > 0)),
    )
  )
    throw Error('Start one audible layer at offset zero');
  const durationSec = Math.max(...tracks.map((t) => t.offsetSec + t.length));
  const loopable = tracks.every((t) => t.recipe.loopable && t.offsetSec === 0 && t.span === undefined);
  const credits = tracks
    .flatMap((t) => [t.recipe.recording, ...(t.recipe.additionalRecordings ?? [])])
    .filter((c) => c !== undefined);
  const unique = [...new Map(credits.map((c) => [c.url, c])).values()];
  const stereo = tracks.some((t) => Boolean(t.recipe.renderStereo));

  function mix(ctx: RenderContext, opts: ResolvedOptions, stereoOut: boolean) {
    const output = Array.from({ length: stereoOut ? 2 : 1 }, () => new Float32Array(ctx.frames));
    for (const [index, track] of tracks.entries()) {
      if (!track.gain) continue;
      const controls = Object.fromEntries(
        Object.keys(track.recipe.params).map((key) => [key, opts.params[paramKey(index, key)]]),
      );
      const audio = renderChannels(
        track.recipe,
        { seed: (opts.seed + index * 8191) >>> 0, params: controls, macros: track.macros },
        ctx.sampleRate,
      );
      const offset = Math.round(track.offsetSec * ctx.sampleRate);
      const start = Math.round(track.start * ctx.sampleRate);
      const frames =
        track.recipe.loopable && track.span === undefined ? ctx.frames : Math.round(track.length * ctx.sampleRate);
      const length = Math.min(frames, ctx.frames - offset);
      const gainCurve = track.envelope.length ? automation(track.envelope, true) : undefined;
      const wetCurve = track.muffle && automation(track.muffle.envelope, false);
      const filters =
        track.muffle &&
        audio.map(() =>
          biquad('lowpass', Math.min(ctx.sampleRate * 0.45, track.muffle!.cutoffHz), 0.707, ctx.sampleRate),
        );
      const edge = Math.max(1, Math.round(ctx.sampleRate * 0.003));
      for (let i = 0; i < length; i++) {
        const frame = (start + i) % audio[0].length;
        if (!track.recipe.loopable && start + i >= audio[0].length) break;
        const time = i / ctx.sampleRate;
        let gain = track.gain * (gainCurve ? gainCurve(time) : 1);
        let left = audio[0][frame];
        let right = (audio[1] ?? audio[0])[frame];
        if (filters && wetCurve) {
          const wet = wetCurve(time);
          left += wet * (filters[0](left) - left);
          right = filters[1] ? right + wet * (filters[1](right) - right) : left;
        }
        if (start) gain *= Math.min(1, i / edge);
        if (track.span !== undefined) gain *= Math.min(1, (length - 1 - i) / edge);
        if (stereoOut) {
          output[0][offset + i] += gain * left;
          output[1][offset + i] += gain * right;
        } else {
          const mono = audio.length === 1 ? left : (left + right) * 0.5;
          output[0][offset + i] += gain * mono;
        }
      }
    }
    return output;
  }

  // Keep sync points addressable when this mix becomes a layer in another design.
  const markers: Record<string, number> = {};
  for (const [index, track] of tracks.entries()) {
    for (const [name, sourceTime] of Object.entries(track.recipe.markers ?? {})) {
      const relative = sourceTime / positions[index].speed - track.start;
      if (relative >= 0 && relative < track.length) {
        markers['layer' + (index + 1) + '.' + name] = track.offsetSec + relative;
        if (layers[index].label) markers[layers[index].label + '.' + name] = track.offsetSec + relative;
      }
    }
  }
  const result: SoundRecipe = {
    isolation: tracks.every(track => track.recipe.isolation === 'isolated') ? 'isolated' : undefined,
    markers,
    id: design.id,
    name: design.name ?? design.id,
    category: first.category,
    mixRole: first.mixRole,
    tags: [...new Set(['remix', ...first.tags, ...tracks.slice(1).map((t) => t.recipe.id)])],
    loopable,
    immediateOnset: !loopable,
    durationSec,
    spectrum: design.spectrum ?? first.spectrum,
    params,
    macros: styling,
    targetRmsDbfs: first.targetRmsDbfs,
    recording: unique[0],
    additionalRecordings: unique.slice(1),
    render: (ctx, opts) => mix(ctx, opts, false)[0],
    renderStereo: stereo
      ? (ctx, opts) => {
          const [left, right] = mix(ctx, opts, true);
          return [left, right];
        }
      : undefined,
  };
  if (durationSec > 120 || renderDurationSec(result) > 120 || renderDurationSec(result) < 0.01)
    throw Error('Remix duration must be 0.01 to 120 seconds');
  return result;
}
