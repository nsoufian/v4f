export const getErrorMessage = options =>
  options.message !== undefined ? options.message : false;

export const contextWrapper = rules => context => {
  const newContext = context;
  Object.entries(rules).forEach(([name, rule]) => {
    newContext.prototype[name] = function(...args) {
      return this._add(rule(...args));
    };
  });
  return newContext;
};

export const isObjectsEquals = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const isEmpty = obj => isObjectsEquals(obj, {});
