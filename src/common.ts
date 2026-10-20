export const seconds = 60;
export const rotate = (turns: number, fractionDigits = 1) =>
  `rotate(${Number((turns * 360).toFixed(fractionDigits))})`;
export const clockFaceId = 'clock-face';
export const clockHourId = 'clock-hour';
export const clockMinuteId = 'clock-minute';
export const clockSecondId = 'clock-second';
