export const seconds = 60;
/** Converts a 0–1 fraction of a full turn into a CSS `rotate(...)` string. */
export const rotate = (fraction: number, fractionDigits: number) =>
  `rotate(${Number((fraction * 360).toFixed(fractionDigits))})`;

// Turns seconds since midnight into one full revolution per hand.
const hoursPerClock = 12; // 12 hour positions on the dial
/** Fraction of a full turn for the hour hand. */
export const hourFraction = (clock: number) =>
  ((clock / seconds ** 2) % hoursPerClock) / hoursPerClock;
/** Fraction of a full turn for the minute hand. */
export const minuteFraction = (clock: number) =>
  ((clock / seconds) % seconds) / seconds;
/** Fraction of a full turn for the second hand. */
export const secondFraction = (clock: number) => (clock % seconds) / seconds;
/** Fractional seconds (0–1). */
export const subsecondFraction = (clock: number) => clock % 1;

export const clockFaceId = 'clock-face';
export const clockGraduationId = 'clock-graduation';
export const clockHourId = 'clock-hour';
export const clockMinuteId = 'clock-minute';
export const clockSecondId = 'clock-second';
