import { object, hasKey, hasValue } from "../rules/object";

describe("Validate Rule object", () => {
  test("Object rule with value {a:1} should be true", () => {
    expect(object({ a: 1 })).toBe(true);
  });

  test("Object rule with value 'test' should be false", () => {
    expect(object("test")).toBe(false);
  });

  test("Object rule with value 3 should be false", () => {
    expect(object(3)).toBe(false);
  });

  test("Object rule with value [2,3] should be false", () => {
    expect(object([2, 3])).toBe(false);
  });

  test("Object rule with value true should be false", () => {
    expect(object(true)).toBe(false);
  });
});

describe("Validate Rule hasKey", () => {
  const data = {
    valid: ["a", "b", "c"],
    invalid: ["d", "l", "r"]
  };
  const obj = {
    a: 1,
    b: 2,
    c: 3
  };
  data.valid.forEach(elm => {
    it(`value: ${elm} should be true`, () => {
      expect(hasKey(elm, obj)).toBe(true);
    });
  });
  data.invalid.forEach(elm => {
    it(`value: ${elm} should be false`, () => {
      expect(hasKey(elm, obj)).toBe(false);
    });
  });
});

describe("Validate Rule hasValue", () => {
  const data = {
    valid: [1, 2, 3],
    invalid: [4, 5, 5]
  };
  const obj = {
    a: 1,
    b: 2,
    c: 3
  };
  data.valid.forEach(elm => {
    it(`value: ${elm} should be true`, () => {
      expect(hasValue(elm, obj)).toBe(true);
    });
  });
  data.invalid.forEach(elm => {
    it(`value: ${elm} should be false`, () => {
      expect(hasValue(elm, obj)).toBe(false);
    });
  });
});
