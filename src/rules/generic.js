import { isEmpty, isObjectsEquals } from "../utils";

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
