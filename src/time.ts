import { createMemo, createRoot, createSignal } from 'solid-js';

import {
  hourFraction,
  minuteFraction,
  secondFraction,
  subsecondFraction,
} from '#src/common';
import { filterTimeZones } from '#src/timezone-options';

export const getSecondsSinceMidnight = (date: Date = new Date()) =>
  toSeconds(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );

export const toSeconds = (
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number,
) => hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;

// Intentional client-only shared clock: one rAF loop drives every time instance.
const { now, setNow } = createRoot(() => {
  const [now, setNow] = createSignal(Date.now());
  return { now, setNow };
});

export { now, setNow };

const subscribers = new Map<symbol, () => void>();
let frame = 0;

export const startClock = (owner: symbol) => {
  const existing = subscribers.get(owner);
  if (existing) return existing;

  const cleanup = () => {
    if (!subscribers.has(owner)) return;
    subscribers.delete(owner);
    if (subscribers.size === 0) cancelAnimationFrame(frame);
  };

  if (subscribers.size === 0) {
    frame = requestAnimationFrame(function loop() {
      setNow(Date.now());
      frame = requestAnimationFrame(loop);
    });
  }

  subscribers.set(owner, cleanup);

  return cleanup;
};

export const getTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export function getTimeZones(): string[] {
  return filterTimeZones(Intl.supportedValuesOf('timeZone'));
}

const formatters = new Map<string, Intl.DateTimeFormat>();

const formatterFor = (zone: string) => {
  const existing = formatters.get(zone);
  if (existing) return existing;

  const formatter = new Intl.DateTimeFormat(undefined, {
    calendar: 'gregory',
    day: 'numeric',
    hour: 'numeric',
    hourCycle: 'h23',
    minute: 'numeric',
    month: 'numeric',
    numberingSystem: 'latn',
    second: 'numeric',
    timeZone: zone,
    year: 'numeric',
  });
  formatters.set(zone, formatter);
  return formatter;
};

export const zonedParts = (timestamp: number, zone: string) => {
  const {
    day = 1,
    hour = 0,
    minute = 0,
    month = 1,
    second = 0,
    year = 0,
  } = formatterFor(zone).formatToParts(timestamp)
    .reduce<Partial<Record<Intl.DateTimeFormatPartTypes, number>>>(
      (numbers, { type, value }) => {
        numbers[type] = Number(value);
        return numbers;
      },
      {},
    );

  const ms = ((timestamp % 1000) + 1000) % 1000;

  return {
    offset: Math.floor((Date.UTC(year, month - 1, day, hour, minute, second, ms) - timestamp) / 1000),
    wallSeconds: toSeconds(hour, minute, second, ms),
  };
};

export const createTime = (zone: () => string) => {
  const clock = createMemo(() => zonedParts(now(), zone()).wallSeconds);
  return {
    get hour() {
      return hourFraction(clock());
    },
    get minute() {
      return minuteFraction(clock());
    },
    get second() {
      return secondFraction(clock());
    },
    get subsecond() {
      return subsecondFraction(clock());
    },
    get zone() {
      return zone();
    },
  };
};
