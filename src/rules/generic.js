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

export const optional = value => value === null || value === undefined;

export const valueIn = (set, value) => {
  const data = Object.entries(set).map(element => element[1]);
  for (let i = 0; i < data.length; i += 1) {
    if (data[i] === value) {
      return true;
    }
  }
  return false;
};

export const notIn = (set, value) => !valueIn(set, value);
