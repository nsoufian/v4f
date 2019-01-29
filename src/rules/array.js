import { equals, exact } from "./generic";

export const array = v => v instanceof Array;

export const allEquals = (value, arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (!equals(value, arr[i])) {
      return false;
    }
  }
  return true;
};

export const allExact = (value, arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (!exact(value, arr[i])) {
      return false;
    }
  }
  return true;
};
