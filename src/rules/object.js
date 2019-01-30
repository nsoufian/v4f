export const object = value =>
  typeof value === "object" && !(value instanceof Array);

export const hasKey = (key, obj) => key in obj;

export const hasValue = (value, obj) => {
  const values = Object.values(obj);
  for (let i = 0; i < values.length; i += 1) {
    if (values[i] === value) {
      return true;
    }
  }
  return false;
};
