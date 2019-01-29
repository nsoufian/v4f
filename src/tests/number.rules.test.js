import {
  between,
  number,
  greater,
  greaterOrEquals,
  less,
  lessOrEquals,
  positive,
  negative,
  betweenOrEquals
} from "../rules/number";

describe("Test Number Rule", () => {
  const values = { valid: [3, 43, 5], invalid: [true, { a: 3 }, "3"] };
  const rule = number;

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

describe("Test Between 10 and 20 Rule", () => {
  const values = { valid: [11, 14], invalid: [9, 20, 10, 22] };

  const rule = n => between(10, 20, n);

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

describe("Test BetweenOrEquals 10 and 20 Rule", () => {
  const values = { valid: [10, 20, 11, 14], invalid: [9, 5, 120, 22] };

  const rule = n => betweenOrEquals(10, 20, n);

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

describe("Validate Greater than 10 Rule", () => {
  const values = { valid: [11, 22, 200], invalid: [10, 8, 0] };

  const rule = n => greater(n, 10);

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

describe("Validate GreaterOrEquals to 10 Rule", () => {
  const values = { valid: [10, 22, 20, 99], invalid: [9, 5, 8] };

  const rule = n => greaterOrEquals(n, 10);

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

describe("Validate Less 10 Rule", () => {
  const values = { valid: [9, 3, 4, 0], invalid: [10, 11, 34] };

  const rule = n => less(n, 10);

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

describe("Validate LessOrEquals than 10 Rule", () => {
  const values = { valid: [9, 3, 4, 0, 10], invalid: [100, 11, 34] };

  const rule = n => lessOrEquals(n, 10);

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

describe("Test Positive & Negative Rule", () => {
  const values = { valid: [0, 10, 3], invalid: [-2, -4, -10] };

  values.valid.forEach(n => {
    it(`value : ${n} should be true for positive and false for negative`, () => {
      expect(positive(n)).toBe(true);
      expect(negative(n)).toBe(false);
    });
  });

  values.invalid.forEach(n => {
    it(`value : ${n} should be false postrive and true negative`, () => {
      expect(positive(n)).toBe(false);
      expect(negative(n)).toBe(true);
    });
  });
});
