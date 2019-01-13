export default class Context {
  constructor() {
    this.rules = [];
  }

  addRule(rule) {
    this.rules.push(rule);
    return this;
  }
}
