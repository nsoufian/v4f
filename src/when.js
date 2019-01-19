import { execute, getNestedValue } from "./utils";

const validateMulti = (name, rule, values) => {
  let isPassed = true;
  for (let j = 0; j < name.length && isPassed; j += 1) {
    if (rule.validate(getNestedValue(name[j], values)) === false) {
      isPassed = false;
    }
  }
  return isPassed;
};

class When {
  #rules = [];

  when(name, rule) {
    this.#rules.push({ name, rule });
    return this;
  }

  end(name, rule) {
    this.#rules.push("&&");
    this.#rules.push({ name, rule });
    return this;
  }

  or(name, rule) {
    this.#rules.push("||");
    this.#rules.push({ name, rule });
    return this;
  }

  validate(values) {
    const result = [];
    for (let i = 0; i < this.#rules.length; i += 1) {
      if (typeof this.#rules[i] === "object") {
        const { name, rule } = this.#rules[i];
        if (name instanceof Array) {
          result.push(validateMulti(name, rule, values));
        } else {
          result.push(rule.validate(getNestedValue(name, values)));
        }
      } else {
        result.push(this.#rules[i]);
      }
    }
    return execute(result);
  }
}

export default When;
