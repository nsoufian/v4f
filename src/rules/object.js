export const object = (options = {}) => ({
  validator: value => typeof value === "object",
  options
});

export const lint = (options = {}) => ({ options });
