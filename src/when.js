import { execute } from "./utils";

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
        // TODO get nested value
        result.push(rule.validate(values[name]).toString());
      } else {
        result.push(this.#rules[i]);
      }
    }
    return execute(result);
  }
}

export default When;
