// TODO change eval with other method
const run = eval;

export const isObjectsEquals = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const isEmpty = obj => isObjectsEquals(obj, {});

export const isObject = value => typeof value === "object";

export const isArray = value => value instanceof Array;

export const execute = value => run(value.join(" "));

export const getValue = (name, values) => {
  const names = name.split(".");
  let value = values[names[0]];
  for (let i = 1; i < names.length; i += 1) value = value[names[i]];
  return value;
};

export const rulesWrapper = rules => Context => {
  const wrappedContext = Context;
  Object.entries(rules).forEach(([name, rule]) => {
    wrappedContext.prototype[name] = function(...args) {
      return new Context([
        ...this._rules(),
        {
          rule,
          name,
          args: args.slice(0, rule.length - 1),
          options: !args[rule.length - 1] ? {} : args[rule.length - 1]
        }
      ]);
    };
  });
  return wrappedContext;
};

export const resolveArgs = (args, values) => {
  const newArgs = [];
  args.forEach(arg => {
    if (arg instanceof Array && arg[0][0] === "#") {
      let value = getValue(arg[0].slice(1), values);
      if (arg.length > 1) {
        value = arg[1](value);
      }
      newArgs.push(value);
    } else {
      newArgs.push(arg);
    }
  });
  return newArgs;
};
