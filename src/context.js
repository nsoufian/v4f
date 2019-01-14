import { getErrorMessage, contextWrapper } from "./utils";

class Context {
  #rules = [];

  _add(rule) {
    // push this rule given in param to rules array
    this.#rules.push(rule);
    // and return context to continue the chain of rules
    return this;
  }

  validate(value, { message = false } = {}) {
    for (let i = 0; i < this.#rules.length; i += 1) {
      // Get validator function and options object from
      // the current rule.
      const { validator, options } = this.#rules[i];
      if (validator(value) !== true) {
        // the rule is fail , we check if the user want
        // a error message indicator or boolean.
        if (message === false) return getErrorMessage(options);
        return false;
      }
    }
    // All rules are valide we return true to indicate that
    return true;
  }
}

export default contextWrapper(Context);
