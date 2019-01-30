import { Field, Schema, When } from "../index";

const json = JSON.stringify;

describe("Validate constraint in default Strict mode, constraint b field should be falsy when a truly", () => {
  const values = {
    valid: [{ a: true, b: false }, { a: false, b: true }],
    invalid: [{ a: true, b: true }, { a: false, b: false }]
  };

  const rule = v =>
    Schema({
      a: Field()
        .boolean()
        .required(),
      b: Field()
        .boolean()
        .falsy({
          constraint: When(
            "#a",
            Field()
              .boolean()
              .truthy()
          )
        })
    }).validate(v);

  values.valid.forEach(v => {
    it(`Value : ${json(v)} , should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`Value : ${json(v)} , should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});

describe("Validate constraint in No Strict mode, constraint b field should be falsy when a truly", () => {
  const values = {
    valid: [
      { a: true, b: false },
      { a: false, b: true },
      { a: false, b: false }
    ],
    invalid: [{ a: true, b: true }]
  };

  const rule = v =>
    Schema(
      {
        a: Field()
          .boolean()
          .required(),
        b: Field()
          .boolean()
          .falsy({
            constraint: When(
              "#a",
              Field()
                .boolean()
                .truthy()
            )
          })
      },
      { strict: false }
    ).validate(v);

  values.valid.forEach(v => {
    it(`Value : ${json(v)} , should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`Value : ${json(v)} , should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});

describe("Validate constraint with With multiple field `END` , constraint c should be true when a and b false", () => {
  const values = {
    valid: [
      { a: true, b: true, c: false },
      { a: true, b: false, c: false },
      { a: false, b: false, c: true }
    ],
    invalid: [
      { a: true, b: true, c: true },
      { a: true, b: false, c: true },
      { a: false, b: false, c: false }
    ]
  };
  const ruleArray = v =>
    Schema({
      a: Field().boolean(),
      b: Field().boolean(),
      c: Field()
        .boolean()
        .truthy({
          constraint: When(
            ["#a", "#b"],
            Field()
              .boolean()
              .falsy()
          )
        })
    }).validate(v);

  const ruleEnd = v =>
    Schema({
      a: Field().boolean(),
      b: Field().boolean(),
      c: Field()
        .boolean()
        .truthy({
          constraint: When(
            "#a",
            Field()
              .boolean()
              .falsy()
          ).end(
            "#b",
            Field()
              .boolean()
              .falsy()
          )
        })
    }).validate(v);

  values.valid.forEach(v => {
    it(`Value : ${json(v)} , should be true`, () => {
      expect(ruleArray(v)).toBe(true);
      expect(ruleEnd(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`Value : ${json(v)} , should be false`, () => {
      expect(ruleArray(v)).toBe(false);
      expect(ruleEnd(v)).toBe(false);
    });
  });
});

describe("Validate constraint with With `OR` , constraint c should be true when a or b false", () => {
  const values = {
    valid: [
      { a: true, b: true, c: false },
      { a: true, b: false, c: true },
      { a: false, b: false, c: true }
    ],
    invalid: [
      { a: true, b: true, c: true },
      { a: true, b: false, c: false },
      { a: false, b: false, c: false }
    ]
  };
  const rule = v =>
    Schema({
      a: Field().boolean(),
      b: Field().boolean(),
      c: Field()
        .boolean()
        .truthy({
          constraint: When(
            "#a",
            Field()
              .boolean()
              .falsy()
          ).or(
            "#b",
            Field()
              .boolean()
              .falsy()
          )
        })
    }).validate(v);

  values.valid.forEach(v => {
    it(`Value : ${json(v)} , should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`Value : ${json(v)} , should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});

describe("Validate Required Rule with constraint, constraint b should equals abc and required when a is truthy", () => {
  const values = {
    valid: [{ a: true, b: "abc" }, { a: false }, { a: false, b: "abc" }],
    invalid: [
      [{ a: true, b: "bad" }, "equals"],
      [{ a: true }, "required"],
      [{ a: false, b: "bad" }, "equals"]
    ]
  };
  const rule = v =>
    Schema(
      {
        a: Field()
          .boolean()
          .required(),
        b: Field()
          .string()
          .equals("abc")
          .required({
            constraint: When("#a", Field().any.truthy())
          })
      },
      { verbose: true }
    ).validate(v);

  values.valid.forEach(v => {
    it(`Value : ${json(v)} , should be true`, () => {
      expect(rule(v)).toBe(null);
    });
  });
  values.invalid.forEach(([v, reponce]) => {
    it(`Value : ${json(v)} , should be false`, () => {
      expect(rule(v)).toEqual({ b: reponce });
    });
  });
});

describe("Validate constraint with Cross Field, constraint Field a string c is required when a equals b", () => {
  const values = {
    valid: [
      { a: "str", b: "other" },
      { a: "str", b: "str", c: "other" },
      { a: "str", b: "other", c: "other" }
    ],
    invalid: [{ a: "str", b: "str" }, { a: "str", b: "other", c: 9 }]
  };
  const rule = v =>
    Schema({
      a: Field()
        .string()
        .required(),
      b: Field()
        .string()
        .required(),
      c: Field()
        .string()
        .required({
          constraint: When(
            "#a",
            Field()
              .string()
              .equals(["#b"])
          )
        })
    }).validate(v);

  values.valid.forEach(v => {
    it(`Value : ${json(v)} , should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`Value : ${json(v)} , should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});
