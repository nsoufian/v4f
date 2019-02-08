import { Field } from "../index";

describe("Validate not Required in String Field", () => {
  const values = { valid: [null, undefined, ""], invalid: [{}, [], true] };

  const rule = v =>
    Field()
      .string()
      .not.required()
      .validate(v);

  values.valid.forEach(v => {
    it(`Value : ${v} , should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`Value : ${v} , should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});

describe("Validate not Required in Boolean Field", () => {
  const values = {
    valid: [null, undefined, true, false],
    invalid: [{}, [], "", "string", { a: 2 }]
  };

  const rule = v =>
    Field()
      .boolean()
      .not.required()
      .validate(v);

  values.valid.forEach(v => {
    it(`Value : ${v} , should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`Value : ${v} , should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});

describe("Validate not Required in Object Field", () => {
  const values = {
    valid: [null, undefined, {}, { a: 2 }],
    invalid: [[], "", "string", [2], true, false]
  };

  const rule = v =>
    Field()
      .object()
      .not.required()
      .validate(v);

  values.valid.forEach(v => {
    it(`Value : ${v} , should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`Value : ${v} , should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});

describe("Validate not Required in Array Field", () => {
  const values = {
    valid: [null, undefined, [], [1, 2]],
    invalid: [{}, "", "string", { a: 2 }, true, false]
  };

  const rule = v =>
    Field()
      .array()
      .not.required()
      .validate(v);

  values.valid.forEach(v => {
    it(`Value : ${v} , should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`Value : ${v} , should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});

describe("Validate Custom rule with uppercase in String Field", () => {
  const values = { valid: ["UP", "IP", "LOB"], invalid: ["lll", "il"] };

  const customFun = v => {
    if (v === v.toUpperCase()) {
      return true;
    }
    return false;
  };

  const rule = v =>
    Field()
      .string()
      .custom(customFun)
      .validate(v);

  values.valid.forEach(v => {
    it(`Value : ${v} , should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`Value : ${v} , should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});
