import { getErrorMessage, fieldWrapper } from "./utils";
import rules from "./rules/index";

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
      const { validator, options } = this.#rules[i];
      const validation = validator(value);
      if (options.when !== undefined) {
        const when = options.when.validate(values);
        if (validation === when) {
          continue;
        } else {
          if (message === true) return getErrorMessage(options);
          return false;
        }
      }
      if (validation !== true && options.wen === undefined) {
        // the rule is fail , we check if the user want
        // a error message indicator or boolean.
        if (message === true) return getErrorMessage(options);
        return false;
      }
    }
    // All rules are valide we return true to indicate that
    return true;
  }
}

export default fieldWrapper(rules)(Field);
