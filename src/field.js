import rules from "./rules/index";
import { resolveArgs } from "./utils";

class Field {
  #rules = [];

  _add(rule) {
    // push this rule given in param to rules array
    this.#rules.push(rule);
    // and return context to continue the chain of rules
    return this;
  }

  validate(value, { message = false, values } = {}) {
    for (let i = 0; i < this.#rules.length; i += 1) {
      // Get validator function and options object from
      // the current rule.
      const { validator, options, args } = this.#rules[i];
      const isValide = validator(...resolveArgs(args, values), value);
      if (
        (options.apply && !isValide && options.apply.validate(values)) ||
        (!options.apply && !isValide)
      ) {
        if (message === true) {
          return options.message;
        }
        return false;
      }
    }
    // All rules are valide we return true to indicate that
    return true;
  }
}

Object.entries(rules).forEach(([name, rule]) => {
  Field.prototype[name] = function(...args) {
    return this._add({
      validator: rule,
      name,
      args: args.slice(0, rule.length - 1),
      options: args[rule.length - 1] === undefined ? {} : args[rule.length - 1]
    });
  };
});

export default Field;
