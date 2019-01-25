const validation = (schema, values, options) => {
  const rules = Object.entries(schema);
  for (let i = 0; i < rules.length; i += 1) {
    const [name, rule] = rules[i];
    if (!rule.validate(values[name], { values, ...options })) {
      return false;
    }
  }
  return true;
};

const verboseValidation = (schema, values, options) => {
  let errors = null;
  Object.entries(schema).forEach(([name, rule]) => {
    const result = rule.validate(values[name], {
      verbose: true,
      values,
      ...options
    });
    if (result !== true) {
      errors = { ...errors, [name]: result };
    }
  });
  return errors;
};

export default (rules, options = { verbose: false, strict: false }) => {
  function Schema() {}

  Object.entries(rules).forEach(([name, rule]) => {
    Schema.prototype[name] = rule;
  });

  Schema.prototype.validate = (
    values,
    { verbose = options.verbose, strict = options.strict } = {}
  ) => {
    if (verbose) {
      return verboseValidation(rules, values, { strict });
    }
    return validation(rules, values, { strict });
  };

  return new Schema();
};
