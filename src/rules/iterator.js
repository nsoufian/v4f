export const minLength = (minValue, options = {}) => ({
  validator: value => value.length >= minValue,
  options
});

export const maxLegnth = (maxValue, options = {}) => ({
  validator: value => value.length <= maxValue,
  options
});

export const lengthEquals = (length, options = {}) => ({
  validator: value => value.length === length,
  options
});

export const lengthBetween = (minValue, maxValue, options = {}) => ({
  validator: value => minValue <= value.length && value.length <= maxValue,
  options
});
