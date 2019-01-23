export const object = value =>
  typeof value === "object" && !(value instanceof Array);

export const lint = (options = {}) => ({ options });
