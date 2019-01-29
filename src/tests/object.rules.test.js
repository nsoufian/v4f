import { object, hasKey, hasValue } from "../rules/object";

describe("Validate Rule Object", () => {
  const data = {
    valid: [{ a: 1 }, {}],
    invalid: ["l", 3, [2, 4], true]
  };
  const rule = object;

  data.valid.forEach(elm => {
    it(`value: ${elm} should be true`, () => {
      expect(rule(elm)).toBe(true);
    });
  });
  data.invalid.forEach(elm => {
    it(`value: ${elm} should be false`, () => {
      expect(rule(elm)).toBe(false);
    });
  });
});

describe("Validate Rule hasKey with object {a:1,b:2,c:3}", () => {
  const data = {
    valid: ["a", "b", "c"],
    invalid: ["d", "l", "r"]
  };
  const rule = v =>
    hasKey(v, {
      a: 1,
      b: 2,
      c: 3
    });

  data.valid.forEach(elm => {
    it(`value: ${elm} should be true`, () => {
      expect(rule(elm)).toBe(true);
    });
  });
  data.invalid.forEach(elm => {
    it(`value: ${elm} should be false`, () => {
      expect(rule(elm)).toBe(false);
    });
  });
});

describe("Validate Rule hasValue with object {a:1,b:2,c:3}", () => {
  const data = {
    valid: [1, 2, 3],
    invalid: [4, 5, 5]
  };
  const rule = v =>
    hasValue(v, {
      a: 1,
      b: 2,
      c: 3
    });
  data.valid.forEach(elm => {
    it(`value: ${elm} should be true`, () => {
      expect(rule(elm)).toBe(true);
    });
  });
  data.invalid.forEach(elm => {
    it(`value: ${elm} should be false`, () => {
      expect(rule(elm)).toBe(false);
    });
  });
});
