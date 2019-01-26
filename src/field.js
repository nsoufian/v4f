import allRules from "./rules/index";
import { rulesWrapper, resolveArgs } from "./utils";

const isFail = (isValide, apply, values) =>
  (!apply && !isValide) || (apply && (apply.validate(values) && !isValide));

const isFailStrict = (isValide, apply, values) =>
  (!apply && !isValide) || (apply && apply.validate(values) !== isValide);

class Field {
  #rules = null;

  #not = null;

  constructor(initRules = [], not = false) {
    this.#rules = initRules;
    this.#not = not;
  }

  _clone() {
    return [this.#rules, this.#not];
  }

  get not() {
    return new Field([...this.#rules], true);
  }

  validate(value, { verbose = false, values = {}, strict = true } = {}) {
    for (let i = 0; i < this.#rules.length; i += 1) {
      const {
        name,
        rule,
        args,
        not,
        options: { apply, message }
      } = this.#rules[i];

      const isRuleSuccess = rule(...resolveArgs(args, values), value);

      const validationFail = strict ? isFailStrict : isFail;

      // Check if rule required in stats of optional
      if (name === "required" && (not || (strict && apply))) {
        if (
          (!isRuleSuccess && not) ||
          (apply && !apply.validate(values) && !isRuleSuccess)
        ) {
          break;
        } else if (apply && !isRuleSuccess) {
          return verbose === true ? message : false;
        }
      } else if (
        validationFail(not ? !isRuleSuccess : isRuleSuccess, apply, values)
      ) {
        return verbose === true ? message : false;
      }
    }
    return true;
  }
}

export default rulesWrapper(allRules)(Field);
