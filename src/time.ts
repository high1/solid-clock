import { rotate, seconds } from '#src/common';

const hours = seconds / 5;

// Wall-clock seconds since local midnight. Uses getters only (no setHours),
// so it never mutates the argument and is immune to DST transition days
// (which have 23 or 25 elapsed hours).
export const getSecondsSinceMidnight = (date: Date = new Date()) =>
  date.getHours() * 3600 +
  date.getMinutes() * 60 +
  date.getSeconds() +
  date.getMilliseconds() / 1000;

export const hourTransform = (t: number) =>
  rotate(((t / seconds ** 2) % hours) / hours);
export const minuteTransform = (t: number) =>
  rotate(((t / seconds) % seconds) / seconds);
export const secondTransform = (t: number) => rotate((t % seconds) / seconds);
export const subsecondTransform = (t: number) => rotate(t % 1, 0);
