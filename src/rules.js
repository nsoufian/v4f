export const string = options => ({
  validator: value => typeof value === "string",
  options
});

export const number = options => ({
  validator: value => typeof value === "number",
  options
});

export const boolean = options => ({
  validator: value => typeof value === "boolean",
  options
});

export const object = options => ({
  validator: value => typeof value === "object",
  options
});

export const required = options => ({
  validator: value => value !== "" && value !== null && value !== undefined,
  options
});

export const min = (minValue, options) => ({
  validator: value => value.length >= minValue,
  options
});

export const max = (maxValue, options) => ({
  validator: value => value.length <= maxValue,
  options
});

export const equals = (equalsValue, options) => ({
  validator: value => value.length === equalsValue,
  options
});
