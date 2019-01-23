import { isEmpty, isObjectsEquals } from "../utils";

export const required = value =>
  value !== "" &&
  value !== null &&
  value !== undefined &&
  isEmpty(value) !== true &&
  (value instanceof Array ? value.length !== 0 : true);

export const equals = (equalsValue, value) =>
  typeof value === "object" && typeof equalsValue === "object"
    ? isObjectsEquals(value, equalsValue)
    : value === equalsValue;

export const notEquals = (equalsValue, value) =>
  typeof value === "object" && typeof equalsValue === "object"
    ? !isObjectsEquals(value, equalsValue)
    : value !== equalsValue;
