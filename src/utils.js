// TODO change eval with other method
const run = eval;

export const isObjectsEquals = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const isEmpty = obj => isObjectsEquals(obj, {});

export const getValidator = (...args) => fun => fun(...args).validator;

export const execute = value => run(value.join(" "));

export const getValue = (name, values) => {
  const names = name.split(".");
  let value = values[names[0]];
  for (let i = 1; i < names.length; i += 1) {
    value = value[names[i]];
  }
  return value;
};
