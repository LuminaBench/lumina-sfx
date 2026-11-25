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
  const resolved = [],
    warnings = [],
    missing = [];
  for (const layer of layers) {
    const { query, prefer, exclude, ...settings } = layer;
    if (typeof query !== 'string' || !query.trim() || settings.id !== undefined)
      throw Error('Use one audible query per brief layer');
    const hits = rankByIntent(bank, query, exclude ?? '', true).filter(
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
    if (!hits.length) {
      missing.push({ query, label: layer.label });
      continue;
    }
    const hit = hits[0];
    resolved.push({ id: hit.id, ...settings });
    if (hit.contains?.length) warnings.push({ label: layer.label, alreadyContains: hit.contains });
  }
  return {
    decision: missing.length ? 'review' : 'resolved',
    missing,
    warnings,
    design: missing.length ? null : { ...design, layers: resolved },
  };
}
