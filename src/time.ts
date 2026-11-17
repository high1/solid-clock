import { createMemo, createSignal } from 'solid-js';

import {
  hourFraction,
  minuteFraction,
  secondFraction,
  subsecondFraction,
} from '#src/common';

export const getSecondsSinceMidnight = (date: Date = new Date()) =>
  date.getHours() * 3600 +
  date.getMinutes() * 60 +
  date.getSeconds() +
  date.getMilliseconds() / 1000;

// The shared instant. Every clock reads from this single value, so one loop
// drives them all instead of one loop per clock.
const [now, setNow] = createSignal(Date.now());

export { now, setNow };

const subscribers = new Map<symbol, () => void>();
// Single shared rAF loop; runs while any subscriber remains.
let frame = 0;

// Each call adds a subscriber; idempotent per owner (same owner → same cleanup).
// Pair each startClock() with one cleanup call.
export const startClock = (owner: symbol) => {
  const existing = subscribers.get(owner);
  if (existing) return existing;

  const cleanup = () => {
    if (!subscribers.has(owner)) return;
    subscribers.delete(owner);
    if (subscribers.size === 0) cancelAnimationFrame(frame);
  };

  if (subscribers.size === 0) {
    const loop = () => {
      setNow(Date.now());
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
  }

  subscribers.set(owner, cleanup);

  return cleanup;
};

export const getTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const formatters = new Map<string, Intl.DateTimeFormat>();

const formatterFor = (zone: string) => {
  const existing = formatters.get(zone);
  if (existing) return existing;

  const formatter = new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
    month: '2-digit',
    numberingSystem: 'latn',
    second: '2-digit',
    timeZone: zone,
    year: 'numeric',
  });
  formatters.set(zone, formatter);
  return formatter;
};

/** Wall-clock parts of `zone` at `timestamp`: local seconds and UTC offset. */
export const zonedParts = (timestamp: number, zone: string) => {
  const parts = formatterFor(zone).formatToParts(timestamp);

  let hour = 0;
  let minute = 0;
  let second = 0;
  let year = 0;
  let month = 1;
  let day = 1;

  for (const part of parts) {
    switch (part.type) {
      case 'day':
        day = Number(part.value);
        break;
      case 'hour':
        hour = Number(part.value);
        break;
      case 'minute':
        minute = Number(part.value);
        break;
      case 'month':
        month = Number(part.value);
        break;
      case 'second':
        second = Number(part.value);
        break;
      case 'year':
        year = Number(part.value);
        break;
    }
  }

  const wallSeconds =
    hour * 3600 +
    minute * 60 +
    second +
    (((timestamp % 1000) + 1000) % 1000) / 1000;

  const asUTC = Date.UTC(
    year,
    month - 1,
    day,
    hour,
    minute,
    second,
    ((timestamp % 1000) + 1000) % 1000,
  );

  return {
    offset: Math.floor((asUTC - timestamp) / 1000),
    wallSeconds,
  };
};

/** UTC offset of `zone` at `timestamp`, in seconds. */
export const getTimezoneOffset = (timestamp: number, zone: string) =>
  zonedParts(timestamp, zone).offset;

// Wall-clock seconds since local midnight in `zone`.
export const getSecondsSinceMidnightIn = (timestamp: number, zone: string) =>
  zonedParts(timestamp, zone).wallSeconds;

// One clock in `zone`: the shared instant as hand fractions.
export const createTime = (zone: () => string) => {
  const clock = createMemo(() => getSecondsSinceMidnightIn(now(), zone()));

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
    zone,
  };
};
