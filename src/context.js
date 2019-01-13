import { getErrorObject, contextWrapper } from "./utils";

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
      // get the current rule from the array
      const rule = this.#rules[i];
      // check if the rule is valide for the value given
      // in param with the rule validator function.
      if (rule.validator(value) !== true) {
        // the rule is fail , we check if the user
        // want a message error or boolean
        if (message !== false) {
          // options message is true the user need
          // a error object rather than boolean indicator
          return getErrorObject(rule);
        }
        return false;
      }
    }
    // All rules are valide we return true to indicate that
    return true;
  }
}

export default contextWrapper(Context);
