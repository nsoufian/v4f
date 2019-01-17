export const object = (options = {}) => ({
  validator: value => typeof value === "object" && !(value instanceof Array),
  options
});

export const lint = (options = {}) => ({ options });
