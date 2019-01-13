/**
 * Simple module to declare all rules
 *
 */
export const string = (options = {}) => ({
  validator: value => typeof value === "string",
  options
});

export const number = (options = {}) => ({
  validator: value => typeof value === "number",
  options
});

export const boolean = (options = {}) => ({
  validator: value => typeof value === "boolean",
  options
});

export const object = (options = {}) => ({
  validator: value => typeof value === "object",
  options
});

export const required = (options = {}) => ({
  validator: value => value !== "" && value !== null && value !== undefined,
  options
});

export const min = (minValue, options = {}) => ({
  validator: value => value.length >= minValue,
  options
});

export const max = (maxValue, options = {}) => ({
  validator: value => value.length <= maxValue,
  options
});

export const lengthEquals = (length, options = {}) => ({
  validator: value => value.length === length,
  options
});

export const lengthBetween = (minLength, maxLength, options = {}) => ({
  validator: value => minLength <= value.length <= maxLength,
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

export const between = (minValue, maxValue, options = {}) => ({
  validator: value => minValue <= value <= maxValue,
  options
});

export const equals = (equalsValue, options = {}) => ({
  validator: value => value === equalsValue,
  options
});
