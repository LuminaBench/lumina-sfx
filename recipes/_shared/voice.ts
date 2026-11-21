import { biquad, clamp, noise, renderSamples } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

type VoicePoint = readonly [
  seconds: number, force: number, pitch: number, voiced: number, opening: number,
];

interface Growl {
  roughness: number;
  brightness: number;
}

function movingFormant(sampleRate: number, bandwidth: number) {
  let s1 = 0;
  let s2 = 0;
  let a1 = 0;
  let a2 = 0;
  let a3 = 0;
  let damping = 0;
  return {
    tune(frequency: number) {
      const hz = clamp(frequency, 30, sampleRate * 0.43);
      const g = Math.tan(Math.PI * hz / sampleRate);
      damping = bandwidth / hz;
      a1 = 1 / (1 + g * (g + damping));
      a2 = g * a1;
      a3 = g * a2;
    },
    sample(input: number) {
      const delta = input - s2;
      const band = a1 * s1 + a2 * delta;
      const low = s2 + a2 * s1 + a3 * delta;
      s1 = 2 * band - s1;
      s2 = 2 * low - s2;
      return band * damping;
    },
  };
}

const interpolate = (a: number, b: number, t: number) => a + (b - a) * t;

// The opening builds slowly. A shorter, steeper closure supplies the voiced harmonics.
function glottalPulse(phase: number, open: number): number {
  if (phase >= open) return 0;
  const closure = open * 0.76;
  if (phase < closure) return 0.31 * Math.sin(Math.PI * phase / closure);
  return -Math.sin(Math.PI * (phase - closure) / (open - closure));
}

export function growledVoice(ctx: RenderContext, points: readonly VoicePoint[], { roughness, brightness }: Growl): Float32Array {
  const { sampleRate, random } = ctx;
  const hiss = noise(random, 'white');
  const larynx = noise(random, 'pink');
  const movement = biquad('lowpass', 8.2, 0.71, sampleRate);
  const constriction = biquad('bandpass', 41, 0.68, sampleRate);
  const throatNoise = biquad('bandpass', 1540, 0.69, sampleRate);
  const edgeNoise = biquad('bandpass', 3050 + brightness * 740, 0.73, sampleRate);
  const chest = biquad('bandpass', 229, 0.80, sampleRate);
  const closeMic = biquad('highpass', 76, 0.72, sampleRate);
  const mouthLoss = biquad('lowpass', 4830 + brightness * 2170, 0.70, sampleRate);
  const throat = movingFormant(sampleRate, 165);
  const mouth = movingFormant(sampleRate, 205);
  const tongue = movingFormant(sampleRate, 315);
  const lip = movingFormant(sampleRate, 490);

  const size = 0.95 + 0.105 * random();
  const pitchScale = 0.94 + 0.135 * random();
  const timing = 0.962 + 0.087 * random();
  let segment = 0;
  let phase = 1;
  let step = 0;
  let cycle = 0;
  let jitter = 0;
  let opening = 0.52;
  let pressure = 1;
  let alternation = 0.36;

  return renderSamples(ctx, (time, i) => {
    const t = time * timing;
    while (segment < points.length - 2 && t >= points[segment + 1][0]) segment++;
    const a = points[segment];
    const b = points[segment + 1];
    const x = clamp((t - a[0]) / (b[0] - a[0]), 0, 1);
    const curve = x * x * (3 - 2 * x);
    const force = interpolate(a[1], b[1], curve);
    const pitch = interpolate(a[2], b[2], curve);
    const voiced = interpolate(a[3], b[3], curve);
    const jaw = interpolate(a[4], b[4], curve);

    const air = hiss();
    const turbulence = larynx();
    const strain = clamp(0.92 + movement(air) * 7.2, 0.70, 1.19);
    const rattle = clamp(0.84 + constriction(turbulence) * 9.2, 0.36, 1.48);
    if (phase >= 1) {
      phase -= 1;
      cycle++;
      jitter = jitter * 0.45 + (random() - 0.5) * (0.062 + roughness * 0.13);
      alternation += ((0.26 + 0.45 * random()) - alternation) * 0.25;
      const breakUp = random() < roughness * (1 - voiced) * 0.24;
      const rhythm = (cycle & 1) ? 1 : -1;
      // Alternating glottal closures add a lower, rough component without another pitched layer.
      const depth = alternation * roughness * (0.51 + 0.49 * voiced);
      pressure = (0.82 + 0.33 * random()) * (1 + rhythm * depth) * (breakUp ? 0.29 : 1);
      opening = 0.63 - 0.15 * voiced - 0.07 * force + (random() - 0.5) * 0.068;
      step = pitch * pitchScale * (1 + jitter + rhythm * depth * 0.13) /
        (sampleRate * (breakUp ? 1.35 + 0.39 * random() : 1));
    }

    if (i % 32 === 0) {
      throat.tune((340 + 407 * jaw + 77 * force) * size);
      mouth.tune((885 + 481 * jaw + 109 * force) * size);
      tongue.tune((2070 + 474 * jaw) * size);
      lip.tune((3140 + 439 * jaw) * size);
    }

    const fold = glottalPulse(phase, opening) * pressure * voiced;
    phase += step;
    const breath = (0.16 + 0.48 * (1 - voiced) + roughness * 0.18 * force) * rattle;
    const source = fold * 0.98 + (turbulence * 0.78 + air * 0.34) * breath;
    const formants = throat.sample(source) * (1.65 - 0.92 * brightness) +
      mouth.sample(source) * (0.59 + 0.24 * jaw + 0.22 * brightness) +
      tongue.sample(source) * (0.28 + 0.68 * brightness) + lip.sample(source) * (0.11 + 0.32 * brightness);
    const airEdge = breath * (throatNoise(air) * 0.42 + edgeNoise(air) * (0.12 + 0.52 * brightness));
    const grit = formants * (0.79 + roughness * 0.29 * rattle);
    const combined = grit + fold * 0.11 + chest(source) * 0.32 + airEdge;
    return mouthLoss(closeMic(Math.tanh(combined * 1.14))) * force * strain;
  });
}
