import allRules from "./rules/index";
import { rulesWrapper, resolveArgs } from "./utils";

const isFail = (isValide, apply, values) =>
  (!apply && !isValide) || (apply && (apply.validate(values) && !isValide));

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
        name,
        rule,
        args,
        options: { apply, message }
      } = this.#rules[i];

      const isRuleSuccess = rule(...resolveArgs(args, values), value);
      if (name === "optional") {
        if (isFail(!isRuleSuccess, apply, values)) {
          break;
        }
      } else if (isFail(isRuleSuccess, apply, values)) {
        return verbose === true ? message : false;
      }
    }
    return true;
  }
}

export default rulesWrapper(allRules)(Field);
