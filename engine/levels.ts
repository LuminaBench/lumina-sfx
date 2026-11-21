import { biquad, clamp, dbToGain, gainToDb } from './dsp.ts';
import type { MixRole, SoundRecipe } from './types.ts';

// Weighted active-band targets and sample-peak ceilings in dB. Separate roles
// keep environmental beds beneath foreground actions even after calibration.
const targets: Record<MixRole, { targetDb: number; ceilingDbfs: number }> = {
  ambience: { targetDb: -33, ceilingDbfs: -9 },
  detail: { targetDb: -28, ceilingDbfs: -5 },
  foley: { targetDb: -25, ceilingDbfs: -4 },
  interface: { targetDb: -26, ceilingDbfs: -5 },
  voice: { targetDb: -25, ceilingDbfs: -4 },
  vehicle: { targetDb: -23, ceilingDbfs: -3 },
  impact: { targetDb: -20, ceilingDbfs: -1.5 },
};

type MixRecipe = Pick<SoundRecipe, 'mixRole' | 'category' | 'tags' | 'loopable'>;

export function resolveMixRole(recipe: MixRecipe): MixRole {
  if (recipe.mixRole) return recipe.mixRole;
  const { category, tags, loopable } = recipe;
  if (category === 'Weapons' || category === 'Impacts' || category === 'Missiles' ||
    tags.some(tag => tag === 'thunder' || tag === 'explosion')) return 'impact';
  if (category === 'Aircraft' || category === 'Vehicles & Engines') return 'vehicle';
  if (category === 'Weather & Ambience' || category === 'Water & Fire') return loopable ? 'ambience' : 'foley';
  if (category === 'Animals') return tags.some(tag => ['feeding', 'pecking', 'grazing', 'bedding', 'hoof'].includes(tag)) ? 'detail' : 'voice';
  if (category === 'Farming' || tags.some(tag => ['footstep', 'footsteps', 'boot', 'shoe', 'crouch', 'rustle'].includes(tag))) return 'detail';
  if (category === 'Sci-Fi & UI' || category === 'Footsteps & UI') return 'interface';
  return 'foley';
}

// A short-window engineering meter. The low cut and presence weighting make
// quiet sub rumble and bright UI less misleading than unweighted RMS.
// This is an approximation for cue matching, not a broadcast LUFS meter.
export function measureLevel(samples: Float32Array, rate: number): { activeDb: number; peakDbfs: number } {
  const removeRumble = biquad('highpass', 66, 0.71, rate);
  const presence = biquad('highpass', 1760, 0.60, rate);
  const size = Math.max(1, Math.round(rate * 0.05));
  const blocks: number[] = [];
  let strongest = 0;
  let peak = 0;
  for (let start = 0; start < samples.length; start += size) {
    const end = Math.min(samples.length, start + size);
    let sum = 0;
    for (let index = start; index < end; index++) {
      const sample = samples[index];
      peak = Math.max(peak, Math.abs(sample));
      const body = removeRumble(sample);
      const weighted = body + 0.49 * presence(body);
      sum += weighted * weighted;
    }
    const power = sum / (end - start);
    strongest = Math.max(strongest, power);
    blocks.push(power);
  }
  const gate = Math.max(1e-12, strongest * 0.0625);
  let sum = 0;
  let active = 0;
  for (const power of blocks) {
    if (power < gate) continue;
    sum += power;
    active++;
  }
  return { activeDb: gainToDb(Math.sqrt(sum / Math.max(1, active))), peakDbfs: gainToDb(peak) };
}

export function balanceSettings(samples: Float32Array, rate: number, role: MixRole) {
  const measured = measureLevel(samples, rate);
  const { targetDb, ceilingDbfs } = targets[role];
  const neededDb = targetDb - measured.activeDb;
  const gainDb = Math.min(clamp(neededDb, -16, 8), ceilingDbfs - measured.peakDbfs);
  return { ...measured, role, targetDb, ceilingDbfs, gainDb };
}

export function balanceLevels(samples: Float32Array, rate: number, role: MixRole): Float32Array {
  const gain = dbToGain(balanceSettings(samples, rate, role).gainDb);
  return samples.map(sample => sample * gain);
}
