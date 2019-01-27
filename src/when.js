import { execute, getValue, isObject, isArray } from "./utils";

const validation = (name, rule, values) => {
  if (!isArray(name)) {
    return rule.validate(getValue(name.slice(1), values));
  }
  for (let i = 0; i < name.length; i += 1) {
    if (!rule.validate(getValue(name[i].slice(1), values))) {
      return false;
    }
  }
  return true;
};

class When {
  #rules = null;

  constructor(rules) {
    this.#rules = rules;
  }

  end(name, rule) {
    return new When([...this.#rules, "&&", { name, rule }]);
  }

  or(name, rule) {
    return new When([...this.#rules, "||", { name, rule }]);
  }

  validate(values) {
    let result = [];
    this.#rules.forEach(rule => {
      if (isObject(rule)) {
        result = [...result, validation(rule.name, rule.rule, values)];
      } else {
        result = [...result, rule];
      }
    });
    return execute(result);
  }
}

export default When;
