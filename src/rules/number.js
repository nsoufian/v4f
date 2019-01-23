export const number = value => typeof value === "number";

export const between = (min, max, value) => value >= min && value <= max;
