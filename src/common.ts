export const seconds = 60;
export const rotate = (rotate: number, fractionDigits = 1) =>
  `rotate(${(rotate * 360).toFixed(fractionDigits)})`;
export const clockFaceId = 'clock-face';
