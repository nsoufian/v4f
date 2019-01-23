export const minLength = (min, value) => value.length >= min;

export const maxLength = (max, value) => value.length <= max;

export const lengthEquals = (length, value) => value.length === length;

export const lengthBetween = (min, max, value) =>
  min <= value.length && value.length <= max;
