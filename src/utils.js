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

const getRules = (name, rules, rule) => {
  if (name === "optional" || name === "required") {
    return [rule, ...rules];
  }
  return [...rules, rule];
};

export const rulesWrapper = rules => Context => {
  const wrappedContext = Context;
  Object.entries(rules).forEach(([name, rule]) => {
    wrappedContext.prototype[name] = function(...args) {
      return new Context(
        getRules(name, this._rules(), {
          rule,
          name,
          args: args.slice(0, rule.length - 1),
          options: !args[rule.length - 1] ? {} : args[rule.length - 1]
        })
      );
    };
  });
  return wrappedContext;
};

const isCrossArg = value => isArray(value) && value[0][0] === "#";

export const resolveArgs = (args, values) => {
  let newArgs = [];
  args.forEach(arg => {
    if (isCrossArg(arg)) {
      const value = getValue(arg[0].slice(1), values);
      newArgs = [...newArgs, arg.length > 1 ? arg[1](value) : value];
    } else {
      newArgs = [...newArgs, arg];
    }
  });
  return newArgs;
};
