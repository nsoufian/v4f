import allRules from "./rules/index";
import { getNestedValue } from "./utils";

const isFail = (isValide, apply, values) =>
  (apply && !isValide && apply.validate(values)) || (!apply && !isValide);

const rulesWrapper = rules => Context => {
  const wrappedfield = Context;
  Object.entries(rules).forEach(([name, rule]) => {
    wrappedfield.prototype[name] = function(...args) {
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
  return wrappedfield;
};

const resolveArgs = (args, values) => {
  const newArgs = [];
  args.forEach(arg => {
    if (arg instanceof Array && arg[0][0] === "#") {
      let value = getNestedValue(arg[0].slice(1), values);
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

class Field {
  #rules = null;

  constructor(initRules = []) {
    this.#rules = initRules;
  }

  _rules() {
    return this.#rules;
  }

  validate(value, { verbose = false, values = {} } = {}) {
    for (let i = 0; i < this.#rules.length; i += 1) {
      const {
        rule,
        args,
        options: { apply, message }
      } = this.#rules[i];

      const isRuleFail = isFail(
        rule(...resolveArgs(args, values), value),
        apply,
        values
      );
      if (isRuleFail === true) {
        return verbose === true ? message : false;
      }
    }
    return true;
  }
}

export default rulesWrapper(allRules)(Field);
