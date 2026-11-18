export interface TimezoneGroup {
  items: {
    index: number;
    zone: string;
  }[];
  region: string;
}

export function filterTimeZones(zones: readonly string[]): string[] {
  return [
    ...new Set(['UTC', ...zones.filter(zone => !zone.startsWith('Etc/GMT'))]),
  ];
}

export function getTimezoneGroups(
  zones: readonly string[],
  query: string,
): TimezoneGroup[] {
  const search = normalize(query.trim());

  const tokens = search.split(' ').filter(Boolean);

  // The first token is treated as a region filter only when it is at least two
  // characters long and a prefix of at least one known region. Requiring two
  // characters keeps single-letter queries from triggering region
  // interpretation. Otherwise every token is matched against the full zone id,
  // which is what lets "new york" match America/New_York.
  const regionPrefix = tokens[0] ?? '';
  const isRegionPrefix
    = regionPrefix.length >= 2
      && zones.some(zone => normalize(zoneRegion(zone)).startsWith(regionPrefix));
  const regionFilter = isRegionPrefix ? regionPrefix : null;
  const terms = regionFilter ? tokens.slice(1) : tokens;

  const matches = zones.filter((zone) => {
    const regionName = normalize(zoneRegion(zone));
    if (regionFilter && !regionName.startsWith(regionFilter)) return false;

    if (terms.length === 0) return true;

    // Terms are matched against the full normalized id (region + label), so a
    // multi-word query can match anywhere in "region/label".
    const haystack = normalize(zone);
    return terms.every(term => haystack.includes(term));
  });

  return buildGroups(matches);
}

export function normalize(text: string): string {
  return text.replaceAll('_', ' ').toLowerCase();
}

export function zoneLabel(zone: string): string {
  return zone.slice(zone.lastIndexOf('/') + 1).replaceAll('_', ' ');
}

export function zoneRegion(zone: string): string {
  const separator = zone.indexOf('/');
  return separator === -1 ? 'Other' : zone.slice(0, separator);
}

function buildGroups(zones: readonly string[]): TimezoneGroup[] {
  const byRegion = new Map<string, string[]>();

  for (const zone of zones) {
    const region = zoneRegion(zone);
    const regionZones = byRegion.get(region);

    if (regionZones) regionZones.push(zone);
    else byRegion.set(region, [zone]);
  }

  let index = 0;

  return Array.from(byRegion, ([region, items]) => ({
    items: items.map(zone => ({ index: index++, zone })),
    region,
  }));
}
