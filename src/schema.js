const validation = (schema, values) => {
  const rules = Object.entries(schema);
  for (let i = 0; i < rules.length; i += 1) {
    const [name, rule] = rules[i];
    if (!rule.validate(values[name], { values })) {
      return false;
    }
  }
  return true;
};

const verboseValidation = (schema, values) => {
  let errors = null;
  Object.entries(schema).forEach(([name, rule]) => {
    const result = rule.validate(values[name], {
      verbose: true,
      values
    });
    if (result !== true) {
      errors = { ...errors, [name]: result };
    }
  });
  return errors;
};

export default (rules, options = { verbose: false }) => {
  function Schema() {}

  Object.entries(rules).forEach(([name, rule]) => {
    Schema.prototype[name] = rule;
  });

  Schema.prototype.validate = (values, { verbose = options.verbose } = {}) => {
    if (verbose) {
      return verboseValidation(rules, values);
    }
    return validation(rules, values);
  };

  return new Schema();
};
