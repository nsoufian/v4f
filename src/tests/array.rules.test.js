import { array, allEquals, allExact } from "../rules/array";

describe("Validate Array rule", () => {
  const values = { valid: [[], [1, 2]], invalid: [{}, 2, "l", true] };
  const rule = array;
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

describe("Validate allEquals rule, with value '3'", () => {
  const values = {
    valid: [[3, 3, 3, 3], [3, "3"]],
    invalid: [[2, 3, 3, 3], [3, 3, 3, 7]]
  };

  const rule = arr => allEquals("3", arr);

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

describe("Validate allEquals rule, with value 3", () => {
  const values = {
    valid: [[3, 3, 3, 3]],
    invalid: [[2, 3, 3, 3], [3, 3, 3, 7], [3, "3"], ["3", "3"]]
  };

  const rule = arr => allExact(3, arr);

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
