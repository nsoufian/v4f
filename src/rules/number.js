export const number = value => typeof value === "number";

export const between = (min, max, value) => value > min && value < max;

export const betweenOrEquals = (min, max, value) =>
  value >= min && value <= max;

export const less = (n, min) => n < min;

export const lessOrEquals = (n, min) => n <= min;

export const greater = (n, max) => n > max;

export const greaterOrEquals = (n, max) => n >= max;

export const positive = n => n >= 0;

export const negative = n => n < 0;
