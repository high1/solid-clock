export const seconds = 60;
export const rotate = (rotate: number, fractionDigits = 1) =>
  `rotate(${(rotate * 360).toFixed(fractionDigits)})`;
export const clockFaceId = 'clock-face';
export const clockGraduationId = 'clock-graduation';
export const clockHourId = 'clock-hour';
export const clockMinuteId = 'clock-minute';
export const clockSecondId = 'clock-second';
