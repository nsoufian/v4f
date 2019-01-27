import {
  equals,
  required,
  exact,
  empty,
  none,
  equalsOneOf,
  exactOneOf
} from "../rules/generic";

describe("Validate Required Rule", () => {
  test("Required rule with value 'valide' should be true", () => {
    expect(required("value")).toBe(true);
  });

  test("Required rule with value [3,3] should be true", () => {
    expect(required([3, 3])).toBe(true);
  });

  test("Required rule with value 9 should be true", () => {
    expect(required(9)).toBe(true);
  });

  test("Required rule with boolean value should be true", () => {
    expect(required(true)).toBe(true);
    expect(required(false)).toBe(true);
  });

  test("Required rule with value {a: 2} should be true", () => {
    expect(required({ a: 2 })).toBe(true);
  });

  test("Required rule with empty string should be false", () => {
    expect(required("")).toBe(false);
  });

  test("Required rule with empty array should be false", () => {
    expect(required([])).toBe(false);
  });

  test("Required rule with empty object should be false", () => {
    expect(required({})).toBe(false);
  });

  test("Required rule with value undefined should be false", () => {
    expect(required(undefined)).toBe(false);
  });

  test("Required rule with value null should be false", () => {
    expect(required(null)).toBe(false);
  });
});

test("Equals rule with values 'str','str' should be true", () => {
  expect(equals("str", "str")).toBe(true);
});

test("Equals rule with values 'string','' should be false", () => {
  expect(equals("string", "")).toBe(false);
});

test("Equals rule with values 3,3 should be true", () => {
  expect(equals(3, 3)).toBe(true);
});

test("Equals rule with values 3,'3' should be true", () => {
  expect(equals(3, "3")).toBe(true);
});

test("Equals rule with values true,true should be true", () => {
  expect(equals(true, true)).toBe(true);
});

test("Equals rule with two object {3:1},{3:1} should be true", () => {
  expect(equals({ 3: 1 }, { 3: 1 })).toBe(true);
});

test("Equals rule with two object {3:1},{3:1, a: 6} should be false", () => {
  expect(equals({ 3: 1 }, { 3: 1, a: 6 })).toBe(false);
});

test("Equals rule with two array [3,1],[3,1] should be true", () => {
  expect(equals({ 3: 1 }, { 3: 1 })).toBe(true);
});

test("Equals rule with two multi dimensional array  [3,[2]],[3,[2]] should be true", () => {
  expect(equals([3, [2]], [3, [2]])).toBe(true);
});

test("Equals rule with two multi dimensional array  [3,[2]],[3,[4]] should be false", () => {
  expect(equals([3, [2]], [3, [4]])).toBe(false);
});

/**
 * Unit Test for exact rule
 */

test("Exact rule with values 'str','str' should be true", () => {
  expect(exact("str", "str")).toBe(true);
});

test("Exact rule with values 'string','' should be false", () => {
  expect(exact("string", "")).toBe(false);
});

test("Exact rule with values 3,3 should be true", () => {
  expect(exact(3, 3)).toBe(true);
});

test("Exact rule with values 3,'3' should be false", () => {
  expect(exact(3, "3")).toBe(false);
});

test("Exact rule with values true,true should be true", () => {
  expect(exact(true, true)).toBe(true);
});

test("Exact rule with two object {3:1},{3:1} should be false", () => {
  expect(exact({ 3: 1 }, { 3: 1 })).toBe(false);
});

test("Exact rule with two object {3:1},{3:1, a: 6} should be false", () => {
  expect(exact({ 3: 1 }, { 3: 1, a: 6 })).toBe(false);
});

test("Exact rule with two array [3,1],[3,1] should be false", () => {
  expect(exact({ 3: 1 }, { 3: 1 })).toBe(false);
});

test("Exact rule with two multi dimensional array  [3,[2]],[3,[2]] should be true", () => {
  expect(exact([3, [2]], [3, [2]])).toBe(false);
});

test("Exact rule with two multi dimensional array  [3,[2]],[3,[4]] should be false", () => {
  expect(exact([3, [2]], [3, [4]])).toBe(false);
});

/**
 * Test for Empty rule
 */

test("Empty rule with empty array should be true", () => {
  expect(empty([])).toBe(true);
});

test("Empty rule with empty array should be true", () => {
  expect(empty({})).toBe(true);
});

test("Empty rule with empty array should be true", () => {
  expect(empty("")).toBe(true);
});

test("Empty rule with no empty array should be false", () => {
  expect(empty([3, 5])).toBe(false);
});

test("Empty rule with no empty object should be false", () => {
  expect(empty({ username: "reyx" })).toBe(false);
});

test("Empty rule with no empty string should be false", () => {
  expect(empty("soufiane.nass7@gmail.com")).toBe(false);
});

/**
 * Test for None rule
 */

test("None rule with empty array should be true", () => {
  expect(none([])).toBe(true);
});

test("None rule with empty array should be true", () => {
  expect(none({})).toBe(true);
});

test("None rule with empty array should be true", () => {
  expect(none("")).toBe(true);
});

test("None rule with null should be true", () => {
  expect(none(null)).toBe(true);
});

test("None rule with undefined should be true", () => {
  expect(none(undefined)).toBe(true);
});

test("None rule with no empty array should be false", () => {
  expect(none([3, 5])).toBe(false);
});

test("None rule with no empty object should be false", () => {
  expect(none({ username: "reyx" })).toBe(false);
});

test("None rule with no empty string should be false", () => {
  expect(none("soufiane.nass7@gmail.com")).toBe(false);
});

/**
 * Test for equalsOneOf rule
 */

test("equalsOneOf rule with array and value in that array should be true", () => {
  expect(equalsOneOf([2, 4, 7, 5], "4")).toBe(true);
});

test("equalsOneOf rule with object and value in that array should be true", () => {
  expect(equalsOneOf({ username: "xns", age: 4 }, "4")).toBe(true);
});

test("equalsOneOf rule with array and value not in that array should be false", () => {
  expect(equalsOneOf([2, 4, 7, 5], 8)).toBe(false);
});

test("equalsOneOf rule with object and value not in that array should be false", () => {
  expect(equalsOneOf({ username: "xns", age: 4 }, "8")).toBe(false);
});

/**
 * Test for exactOneOf rule
 */

test("equalsOneOf rule with array and value in that array should be true", () => {
  expect(exactOneOf([2, 4, 7, 5], 4)).toBe(true);
});

test("equalsOneOf rule with object and value in that array should be true", () => {
  expect(exactOneOf({ username: "xns", age: 4 }, 4)).toBe(true);
});

test("equalsOneOf rule with array and value in that array and not strict equal should be false", () => {
  expect(exactOneOf([2, 4, 7, 5], "4")).toBe(false);
});

test("equalsOneOf rule with object and value in that object and not strict equal should be false", () => {
  expect(exactOneOf({ username: "xns", age: 4 }, "4")).toBe(false);
});

test("equalsOneOf rule with array and value not in that array should be false", () => {
  expect(exactOneOf([2, 4, 7, 5], 8)).toBe(false);
});

test("equalsOneOf rule with object and value not in that array should be false", () => {
  expect(exactOneOf({ username: "xns", age: 4 }, 8)).toBe(false);
});
