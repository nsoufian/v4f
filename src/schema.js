import { isEmpty } from "./utils";

export default schema => (value, options = {}) => {
  const errors = {};
  Object.entries(schema).forEach(([name, rule]) => {
    const result = rule.validate(value[name], options);
    if (result !== true) errors[name] = result;
  });
  return isEmpty(errors) ? null : errors;
};
