import { isEmpty, isObjectsEquals } from "./utils";
/**
 * Simple module to declare all rules
 *
 */
/** **********************************************************************************
 * Generic Rules
 ********************************************************************************** */
export const required = (options = {}) => ({
  validator: value =>
    value !== "" &&
    value !== null &&
    value !== undefined &&
    isEmpty(value) !== true &&
    (value instanceof Array ? value.length !== 0 : true),
  options
});

export const equals = (equalsValue, options = {}) => ({
  validator: value =>
    typeof value === "object" && typeof equalsValue === "object"
      ? isObjectsEquals(value, equalsValue)
      : value === equalsValue,
  options
});

/** **********************************************************************************
 * String Rules
 ********************************************************************************** */
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

/** **********************************************************************************
 * Iterator Rules
 ********************************************************************************** */
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

/** **********************************************************************************
 * Number Rules
 ********************************************************************************** */

export const number = (options = {}) => ({
  validator: value => typeof value === "number",
  options
});

export const between = (minValue, maxValue, options = {}) => ({
  validator: value => minValue <= value && value <= maxValue,
  options
});
/** **********************************************************************************
 * Boolean Rules
 ********************************************************************************** */

export const boolean = (options = {}) => ({
  validator: value => typeof value === "boolean",
  options
});

export const falsy = (options = {}) => ({
  validator: value => value === false,
  options
});

export const truthy = (options = {}) => ({
  validator: value => value === true,
  options
});

/** **********************************************************************************
 * Object Rules
 ********************************************************************************** */

export const object = (options = {}) => ({
  validator: value => typeof value === "object",
  options
});
