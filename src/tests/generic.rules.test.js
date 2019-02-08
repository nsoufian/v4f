import {
  equals,
  required,
  exact,
  empty,
  none,
  oneOf,
  custom,
  exactOneOf
} from "../rules/generic";

describe("Validate Required Rule", () => {
  const values = {
    valid: ["string", [3, 4], 9, true, false, { a: 1 }],
    invalid: ["", [], {}, undefined, null]
  };
  const rule = required;
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

describe("Validate Equals Rule", () => {
  const values = {
    valid: [
      ["str", "str"],
      [2, 2],
      [3, "3"],
      [true, true],
      [{ a: 1 }, { a: 1 }],
      [[3, [3]], [3, [3]]]
    ],
    invalid: [["string", "stringstr"], [{ a: 2 }, { a: 3 }], [[2, 1], [1, 2]]]
  };
  const rule = equals;

  values.valid.forEach(([x, y]) => {
    it(`Value : ${x} and ${y} , should be true`, () => {
      expect(rule(x, y)).toBe(true);
    });
  });
  values.invalid.forEach(([x, y]) => {
    it(`Value : ${x} and ${y} , should be false`, () => {
      expect(rule(x, y)).toBe(false);
    });
  });
});

/**
 * Unit Test for exact rule
 */

describe("Validate Exact Rule", () => {
  const obj = {
    a: 1
  };
  const arr = [1, 2, 3];
  const values = {
    valid: [["str", "str"], [2, 2], [true, true], [obj, obj], [arr, arr]],
    invalid: [
      ["string", "stringstr"],
      [{ a: 2 }, { a: 3 }],
      [[2, 1], [1, 2]],
      [{ a: 1 }, { a: 1 }],
      [[1, 2], [1, 2]],
      ["3", 3]
    ]
  };
  const rule = exact;

  values.valid.forEach(([x, y]) => {
    it(`Value : ${x} and ${y} , should be true`, () => {
      expect(rule(x, y)).toBe(true);
    });
  });
  values.invalid.forEach(([x, y]) => {
    it(`Value : ${x} and ${y} , should be false`, () => {
      expect(rule(x, y)).toBe(false);
    });
  });
});

/**
 * Test for Empty rule
 */
describe("Validate Empty Rule", () => {
  const values = {
    valid: [[], {}, ""],
    invalid: [[1, 2], { a: 2 }, "string"]
  };
  const rule = empty;
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

/**
 * Test for None rule
 */

describe("Validate None Rule", () => {
  const values = {
    valid: [[], {}, "", null, undefined],
    invalid: [[1, 3], "string", { a: 3 }]
  };
  const rule = none;
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
/**
 * Test for equalsOneOf rule
 */
describe("Validate oneOf Rule with 4 as value", () => {
  const values = {
    valid: [[3, 4, 8, 9], { a: 8, b: 4 }, [2, 3, "4"], { a: 3, b: "4" }],
    invalid: [[3, 5, 8, 9], { a: 8, b: 9, c: 44 }]
  };
  const rule = v => oneOf(v, 4);

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

/**
 * Test for exactOneOf rule
 */
describe("Validate oneOf Rule with 4 as value", () => {
  const values = {
    valid: [[3, 4, 8, 9], { a: 8, b: 4 }],
    invalid: [
      [3, 5, 8, 9],
      { a: 8, b: 9, c: 44 },
      [2, 3, "4"],
      { a: 3, b: "4" }
    ]
  };
  const rule = v => exactOneOf(v, 4);
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

describe("Validate Custom Rule", () => {
  const values = {
    valid: [{ fun: v => v === true, v: true }, { fun: v => v >= 5, v: 6 }],
    invalid: [{ fun: v => v === true, v: false }, { fun: v => v >= 5, v: 3 }]
  };
  const rule = custom;
  values.valid.forEach(({ v, fun }) => {
    it(`Value : ${v} , should be true`, () => {
      expect(rule(fun, v)).toBe(true);
    });
  });
  values.invalid.forEach(({ v, fun }) => {
    it(`Value : ${v} , should be false`, () => {
      expect(rule(fun, v)).toBe(false);
    });
  });
});
