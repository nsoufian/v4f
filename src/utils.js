export const getErrorMessage = options =>
  options.message !== undefined ? options.message : false;

export const fieldWrapper = rules => field => {
  const newField = field;
  Object.entries(rules).forEach(([name, rule]) => {
    newField.prototype[name] = function(...args) {
      return this._add(rule(...args));
    };
  });
  return newField;
};

export const isObjectsEquals = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const isEmpty = obj => isObjectsEquals(obj, {});

export const getValidator = (...args) => fun => fun(...args).validator;

export const execute = value => eval(value.join(" "));
