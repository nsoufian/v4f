import { isEmpty, isObjectsEquals } from "../utils";

export const required = value => value !== null && value !== undefined;

export const equals = (equalsValue, value) =>
  typeof value === "object" && typeof equalsValue === "object"
    ? isObjectsEquals(value, equalsValue)
    : // eslint-disable-next-line
		  value == equalsValue;

export const notEquals = (equalsValue, value) => !equals(equalsValue, value);

export const empty = value =>
  value === "" || isObjectsEquals(value, []) || isEmpty(value);

export const notEmpty = value => !empty(value);

export const exact = (compair, value) => compair === value;

export const notExact = (compair, value) => !exact(compair, value);

export const inValues = (set, value) => {
  const data = Object.entries(set).map(element => element[1]);
  for (let i = 0; i < data.length; i += 1) {
    if (data[i] === value) {
      return true;
    }
  }
  return false;
};

export const notIn = (set, value) => !inValues(set, value);
