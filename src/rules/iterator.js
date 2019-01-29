export const lengthEquals = (n, { length }) => length === n;

export const lengthBetween = (min, max, { length }) =>
  length > min && length < max;

export const lengthBetweenOrEquals = (min, max, { length }) =>
  length >= min && length <= max;

export const lengthLess = (n, { length }) => length < n;

export const lengthLessOrEquals = (n, { length }) => length <= n;

export const max = (n, { length }) => lengthLessOrEquals(n, { length });

export const lengthGreater = (n, { length }) => length > n;

export const lengthGreaterOrEquals = (n, { length }) => length >= n;

export const min = (n, { length }) => lengthGreaterOrEquals(n, { length });
