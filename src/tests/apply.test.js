import { Field, Schema, When } from "../index";

const json = JSON.stringify;

describe("Validate apply in default Strict mode, contraint b field should be falsy when a truly", () => {
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
          apply: When(
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

describe("Validate apply in No Strict mode, contraint b field should be falsy when a truly", () => {
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
            apply: When(
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

describe("Validate Apply with With multiple field `END` , contraint c should be true when a and b false", () => {
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
          apply: When(
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
          apply: When(
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

describe("Validate Apply with With `OR` , contraint c should be true when a or b false", () => {
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
          apply: When(
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

describe("Validate Required Rule with apply, contraint b should equals abc and required when a is truthy", () => {
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
            apply: When(
              "#a",
              Field()
                .boolean()
                .truthy()
            )
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

describe("Validate Apply with Cross Field, contraint Field a string c is required when a equals b", () => {
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
          apply: When(
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
