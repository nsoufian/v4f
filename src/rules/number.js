export const number = (options = {}) => ({
  validator: value => typeof value === "number",
  options
});

export const between = (minValue, maxValue, options = {}) => ({
  validator: value => minValue <= value && value <= maxValue,
  options
});
