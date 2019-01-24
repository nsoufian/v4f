import allRules from "./rules/index";
import { rulesWrapper, resolveArgs } from "./utils";

const isFail = (isValide, apply, values) =>
  (apply && !isValide && apply.validate(values)) || (!apply && !isValide);

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
