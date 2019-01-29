import allRules from "./rules/index";
import { rulesWrapper, resolveArgs, isOptionalSuccess } from "./utils";

const isFail = (isRuleSuccess, constraint, strict, values) =>
  strict
    ? constraint && constraint.validate(values) !== isRuleSuccess
    : constraint && constraint.validate(values) && !isRuleSuccess;

const messageTemplate = (message, value, field) =>
  message
    .replace("%{value}", value)
    .replace("%{field}", field)
    .trim();

export class Field {
  #rules = null;

  #not = null;

  constructor(rules = [], not = false) {
    this.#rules = rules;
    this.#not = not;
  }

  _clone() {
    return [this.#rules, this.#not];
  }

  get not() {
    return new Field([...this.#rules], true);
  }

  validate(
    value,
    { verbose = false, values = {}, strict = true, field = "" } = {}
  ) {
    for (let i = 0; i < this.#rules.length; i += 1) {
      const {
        name,
        rule,
        args,
        not,
        options: { constraint, message }
      } = this.#rules[i];

      const isRuleSuccess = not !== rule(...resolveArgs(args, values), value);

      const isOptionalRule =
        name === "required" &&
        (not || (strict && constraint && !constraint.validate(values)));

      if (isOptionalRule) {
        if (isOptionalSuccess(value, this.#rules[i + 1].name)) {
          break;
        }
      } else if (
        (!isRuleSuccess && !constraint) ||
        (name === "required" &&
          (!not && strict && constraint) &&
          !isRuleSuccess) ||
        isFail(isRuleSuccess, constraint, strict, values)
      ) {
        return verbose === true
          ? messageTemplate(message, value, field)
          : false;
      }
    }
    return true;
  }
}

export default rulesWrapper(allRules)(Field);
