import { hasFalse } from "./utils";
import { Field } from "./field";

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

const verboseValidation = (schema, values, bool, options) => {
  let errors = null;
  Object.entries(schema).forEach(([name, rule]) => {
    const result = rule.validate(values[name], {
      verbose: rule instanceof Field ? !bool : true,
      field: name,
      bool,
      values,
      ...options,
      async: false
    });
    if ((result !== true && result !== null) || bool) {
      errors = { ...errors, [name]: result };
    }
  });
  return errors;
};

export default (
  rules,
  options = { verbose: false, strict: true, bool: false, async: false }
) => {
  function Schema() {}

  Object.entries(rules).forEach(([name, rule]) => {
    Schema.prototype[name] = rule;
  });

  Schema.prototype.validate = (
    values = {},
    {
      verbose = options.verbose,
      strict = options.strict,
      bool = options.bool,
      async = options.async
    } = {}
  ) => {
    if (async) {
      return new Promise((resolve, reject) => {
        if (verbose) {
          const result = verboseValidation(rules, values, bool, {
            strict
          });
          if (bool) {
            if (hasFalse(result)) {
              reject(result);
            } else {
              resolve(values);
            }
          } else if (result === null) {
            resolve(values);
          }
          reject(result);
        } else if (validation(rules, values, { strict }) === true) {
          resolve(values);
        } else {
          reject();
        }
      });
    }
    if (verbose) {
      return verboseValidation(rules, values, bool, { strict });
    }
    return validation(rules, values, { strict });
  };

  return new Schema();
};
