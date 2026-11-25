// The coding agent supplies action, viewpoint and emphasis from the user's words.
// Resolve requested performances against the installed catalog before rendering anything.
import { rankByIntent } from './intent-search.mjs';
export function resolveListeningBrief(brief, bank) {
  if (
    brief.schemaVersion !== 2 ||
    !Array.isArray(brief.layers) ||
    !brief.layers.length ||
    brief.layers.length > 32
  )
    throw Error('Expected a version 2 brief with 1–32 named layers');
  const { layers, ...design } = brief;
  design.balance ??=
    design.focus?.marginDb !== undefined || design.focus?.moments?.length ? 'directed' : 'natural';
  design.sourcePolicy ??= 'clean';
  const cleanBank = bank.filter(
    (s) =>
      design.sourcePolicy !== 'clean' || (s.isolation === 'isolated' && !s.cleanHold && !s.auditionNote),
  );
  const resolved = [],
    warnings = [],
    missing = [];
  for (const layer of layers) {
    const { query, prefer, exclude, ...settings } = layer;
    if (typeof query !== 'string' || !query.trim() || settings.id !== undefined)
      throw Error('Use one audible query per brief layer');
    const hits = rankByIntent(cleanBank, query, exclude ?? '', true).filter(
      (hit) => hit.id === query || !hit.missing.length,
    );
    const terms =
      String(prefer ?? '')
        .toLowerCase()
        .match(/[a-z0-9]+/g) ?? [];
    const preference = (hit) => {
      const words = new Set(
        [hit.id, hit.perspective, ...hit.tags]
          .join(' ')
          .toLowerCase()
          .match(/[a-z0-9]+/g),
      );
      return terms.filter((t) => words.has(t)).length;
    };
    hits.sort((a, b) => Number(b.id === query) - Number(a.id === query) || preference(b) - preference(a));
    if (design.scope === 'world') {
      for (let i = hits.length - 1; i >= 0; i--)
        if (hits[i].mixRole === 'interface' || hits[i].tags.some((t) => ['cursor', 'menu'].includes(t)))
          hits.splice(i, 1);
    }
    if (!hits.length) {
      missing.push({
        query,
        label: layer.label,
        reason: 'No eligible source matched the requested action and source policy',
      });
      continue;
    }
    const hit = hits[0];
    if (
      !settings.placement &&
      !settings.acoustics &&
      /cockpit|pilot inside|inside (?:the )?canopy/i.test(design.viewpoint ?? '')
    ) {
      if (hit.tags.includes('turbofan'))
        settings.acoustics = { source: 'turbine', distanceM: 3.5, bearingDeg: 150, elevationDeg: -7 };
      else if (hit.tags.includes('thunder'))
        settings.acoustics = {
          source: 'thunder',
          distanceM: 686,
          bearingDeg: -37,
          elevationDeg: 12,
          through: 'canopy',
        };
      else if (hit.tags.includes('rain') && hit.tags.includes('canopy'))
        settings.acoustics = { source: 'rainfall', distanceM: 1.4, bearingDeg: 8, elevationDeg: 39 };
    }
    const overlaps = resolved.find((other) => {
      if (other.event && settings.event && other.event !== settings.event) return false;
      if (other.afterLayer || other.atMarker || settings.afterLayer || settings.atMarker) return false;
      const already = cleanBank.find((s) => s.id === other.id);
      if (hit.id !== other.id && !hit.components?.some((c) => already.components?.includes(c)))
        return false;
      const a = other.offsetSec ?? 0,
        b = settings.offsetSec ?? 0;
      return (
        a + (other.durationSec ?? other.fitSec ?? already.durationSec) > b &&
        b + (settings.durationSec ?? settings.fitSec ?? hit.durationSec) > a
      );
    });
    if (overlaps) {
      missing.push({
        query,
        label: layer.label,
        reason:
          'Shares an overlapping physical source with ' +
          overlaps.label +
          '. Use one performance or name distinct emitters.',
      });
      continue;
    }
    resolved.push({ id: hit.id, ...settings });
    if (hit.contains?.length) warnings.push({ label: layer.label, alreadyContains: hit.contains });
  }
  if (!design.scope)
    design.scope = resolved.some((l) => cleanBank.find((s) => s.id === l.id)?.mixRole === 'interface')
      ? 'mixed'
      : 'world';
  return {
    decision: missing.length ? 'review' : 'resolved',
    missing,
    warnings,
    design: missing.length ? null : { ...design, layers: resolved },
  };
}
