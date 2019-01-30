import {
  lengthEquals,
  lengthBetween,
  lengthBetweenOrEquals,
  lengthGreater,
  lengthGreaterOrEquals,
  lengthLess,
  lengthLessOrEquals,
  min,
  max
} from "../rules/iterator";

describe("Validate LengthEquals rule with 3", () => {
  const values = {
    valid: ["abc", [1, 2, 3]],
    invalid: ["ab", "abcd", [1, 2, 3, 4]]
  };

  const rule = v => lengthEquals(3, v);

  values.valid.forEach(n => {
    it(`value : ${n} should be true`, () => {
      expect(rule(n)).toBe(true);
    });
  });
  values.invalid.forEach(n => {
    it(`value : ${n} should be false`, () => {
      expect(rule(n)).toBe(false);
    });
  });
});

describe("Validate LengthBetween Rule with min:3, max:6", () => {
  const values = {
    valid: ["abcd", "abcdf", [1, 2, 3, 4]],
    invalid: ["ac", "act", "atrftl", [1, 2, 3]]
  };

  const rule = n => lengthBetween(3, 6, n);

  values.valid.forEach(n => {
    it(`value : ${n} should be true`, () => {
      expect(rule(n)).toBe(true);
    });
  });
  values.invalid.forEach(n => {
    it(`value : ${n} should be false`, () => {
      expect(rule(n)).toBe(false);
    });
  });
});

describe("Validate LengthBetwenOrEquals Rule with min:3, max:5", () => {
  const values = {
    valid: ["abc", "abcd", "abcdf", [1, 2, 3]],
    invalid: ["abcdfe", [1, 2], [1, 2, 3, 4, 5, 6]]
  };

  const rule = v => lengthBetweenOrEquals(3, 5, v);

  values.valid.forEach(v => {
    it(`value : ${v} should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`value : ${v} should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});

describe("Validate lengthGreater rule with 4", () => {
  const values = {
    valid: ["abcde", [1, 2, 3, 4, 5, 6]],
    invalid: ["abcd", [1, 2], "a"]
  };

  const rule = v => lengthGreater(4, v);

  values.valid.forEach(n => {
    it(`value : ${n} should be true`, () => {
      expect(rule(n)).toBe(true);
    });
  });
  values.invalid.forEach(n => {
    it(`value : ${n} should be false`, () => {
      expect(rule(n)).toBe(false);
    });
  });
});

describe("Validate lengthGreaterOrEquals rule and alias min with 4", () => {
  const values = {
    valid: ["abcde", [1, 2, 3, 4, 5, 6], [1, 2, 3, 4]],
    invalid: [[1, 2], "a"]
  };

  const rule = v => lengthGreaterOrEquals(4, v) && min(4, v);

  values.valid.forEach(n => {
    it(`value : ${n} should be true`, () => {
      expect(rule(n)).toBe(true);
    });
  });
  values.invalid.forEach(n => {
    it(`value : ${n} should be false`, () => {
      expect(rule(n)).toBe(false);
    });
  });
});

describe("Validate lengthLess rule with 3", () => {
  const values = { valid: ["ab", [1]], invalid: ["abc", [1, 2, 3, 4]] };

  const rule = v => lengthLess(3, v);

  values.valid.forEach(n => {
    it(`value : ${n} should be true`, () => {
      expect(rule(n)).toBe(true);
    });
  });
  values.invalid.forEach(n => {
    it(`value : ${n} should be false`, () => {
      expect(rule(n)).toBe(false);
    });
  });
});

describe("Validate LengthLessOrEquals rule and alias max with 3", () => {
  const values = {
    valid: ["ab", [1], ["abc"]],
    invalid: ["abcd", [1, 2, 3, 4, 5]]
  };

  const rule = v => lengthLessOrEquals(3, v) && max(3, v);

  values.valid.forEach(n => {
    it(`value : ${n} should be true`, () => {
      expect(rule(n)).toBe(true);
    });
  });
  values.invalid.forEach(n => {
    it(`value : ${n} should be false`, () => {
      expect(rule(n)).toBe(false);
    });
  });
});
