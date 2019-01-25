import allRules from "./rules/index";
import { rulesWrapper, resolveArgs } from "./utils";

const isFail = (isValide, apply, values) =>
  (!apply && !isValide) || (apply && (apply.validate(values) && !isValide));

const isFailStrict = (isValide, apply, values) =>
  (!apply && !isValide) || (apply && apply.validate(values) !== isValide);

class Field {
  #rules = null;

  constructor(initRules = []) {
    this.#rules = initRules;
  }

  _rules() {
    return this.#rules;
  }

  validate(value, { verbose = false, values = {}, strict = false } = {}) {
    for (let i = 0; i < this.#rules.length; i += 1) {
      const {
        name,
        rule,
        args,
        options: { apply, message, not }
      } = this.#rules[i];

      const isRuleSuccess = rule(...resolveArgs(args, values), value);

      const validation = !strict ? isFail : isFailStrict;

      if (name === "optional") {
        if (
          validation(
            not === true ? isRuleSuccess : !isRuleSuccess,
            apply,
            values
          )
        ) {
          break;
        }
      } else if (
        validation(not === true ? !isRuleSuccess : isRuleSuccess, apply, values)
      ) {
        return verbose === true ? message : false;
      }
    }
    return true;
  }
}

export default rulesWrapper(allRules)(Field);
