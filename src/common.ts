export const seconds = 60;
export const hours = seconds / 5;
export const rotate = (rotate: number, fractionDigits = 1) =>
  `rotate(${(rotate * 360).toFixed(fractionDigits)})`;
