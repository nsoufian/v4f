import { isEmpty } from "./utils";

const booleanValidator = (schema, values) => {
  const rules = Object.entries(schema);
  for (let i = 0; i < rules.length; i += 1) {
    const [name, rule] = rules[i];
    const result = rule.validate(values[name], { message: false });
    if (result === false) return false;
  }
  return true;
};
const msgValidator = (schema, values) => {
  const errors = {};
  Object.entries(schema).forEach(([name, rule]) => {
    const result = rule.validate(values[name], {
      message: true
    });
    if (result !== true) errors[name] = result;
  });
  return isEmpty(errors) === true ? null : errors;
};

export default schema => {
  function Validator() {}

  Validator.prototype.validate = function(values, { message = false } = {}) {
    if (message === true) return msgValidator(schema, values);
    return booleanValidator(schema, values);
  };
  Object.entries(schema).forEach(([name, rule]) => {
    Validator.prototype[name] = rule;
  });
  return new Validator();
};
