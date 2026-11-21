// Detect a sustained, level-stable stack of partials. Pitch alone is normal in wildlife.
export function organicMaterial(recipe) {
  return recipe.category === 'Animals' || recipe.tags.some(t =>
    /^(rain|rainfall|drizzle|downpour|thunder|explosion|groan|snarl|wildlife)$/.test(t));
}

export function makeBuzzProbe(rate, fftSize) {
  let last = null;
  let start = 0;
  let longest = 0;
  let worst = null;
  let low = 0;
  let high = 0;
  return {
    frame(power, offset) {
      let peak = 1;
      let total = 0;
      for (let k = 1; k < power.length; k++) {
        total += power[k];
        if (power[k] > power[peak]) peak = k;
      }
      const reset = () => { last = null; };
      if (total < 0.05 || peak < 3 || peak > power.length / 3) return reset();
      const left = Math.log(power[peak-1] + 1e-20);
      const mid = Math.log(power[peak] + 1e-20);
      const right = Math.log(power[peak+1] + 1e-20);
      const bin = peak + 0.5 * (left-right) / (left-2*mid+right || 1);
      let best = 0;
      for (let divisor = 1; divisor <= 4; divisor++) {
        const f = bin / divisor;
        if (f < 3.5) continue;
        let comb = 0;
        let partials = 0;
        for (let h = 1; h <= 14 && Math.round(h*f)+1 < power.length; h++) {
          const k = Math.round(h*f);
          const local = power[k-1] + power[k] + power[k+1];
          comb += local;
          if (local > total * 0.009) partials++;
        }
        if (partials >= 3) best = Math.max(best, comb/total);
      }
      if (best < 0.86) return reset();
      const db = 10 * Math.log10(total);
      if (last === null || Math.abs(bin-last) > 0.10 || Math.max(high, db)-Math.min(low, db) > 3) {
        start = offset;
        low = high = db;
        last = bin;
      }
      low = Math.min(low, db);
      high = Math.max(high, db);
      const span = (offset-start+fftSize)/rate;
      if (span > longest) {
        longest = span;
        worst = { atSec: +(Math.max(0,start)/rate).toFixed(3), peakHz: +(bin*rate/fftSize).toFixed(1), harmonicShare: +best.toFixed(3) };
      }
    },
    result() { return { pass: longest < 0.34, stationarySec: +longest.toFixed(3), ...worst }; },
  };
}
