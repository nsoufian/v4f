export const string = (options = {}) => ({
  validator: value => typeof value === "string",
  options
});

export const startsWith = (startValue, options = {}) => ({
  validator: value => value.startsWith(startValue),
  options
});

export const endsWith = (endValue, options = {}) => ({
  validator: value => value.endsWith(endValue),
  options
});
