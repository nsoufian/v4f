export const boolean = (options = {}) => ({
  validator: value => typeof value === "boolean",
  options
});

export const falsy = (options = {}) => ({
  validator: value => value === false,
  options
});

export const truthy = (options = {}) => ({
  validator: value => value === true,
  options
});
