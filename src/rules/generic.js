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
    : // eslint-disable-next-line eqeqeq
      value == equalsValue;

export const empty = value =>
  value === "" || isObjectsEquals(value, []) || isObjectsEquals(value, {});

export const exact = (compair, value) => compair === value;

export const optional = value => value === null || value === undefined;

export const inValues = (set, value) => {
  const data = Object.entries(set).map(element => element[1]);
  for (let i = 0; i < data.length; i += 1) {
    if (data[i] === value) {
      return true;
    }
  }
  return false;
};
