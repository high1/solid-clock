export const seconds = 60;
export const rotate = (fraction: number, fractionDigits: number) =>
  `rotate(${Number((fraction * 360).toFixed(fractionDigits))})`;

const hoursPerClock = 12; // 12 hour positions on the dial
export const hourFraction = (clock: number) =>
  ((clock / seconds ** 2) % hoursPerClock) / hoursPerClock;
export const minuteFraction = (clock: number) =>
  ((clock / seconds) % seconds) / seconds;
export const secondFraction = (clock: number) => (clock % seconds) / seconds;
export const subsecondFraction = (clock: number) => clock % 1;

export const clockFaceId = 'clock-face';
export const clockGraduationId = 'clock-graduation';
export const clockHourId = 'clock-hour';
export const clockMinuteId = 'clock-minute';
export const clockSecondId = 'clock-second';
