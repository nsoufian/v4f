import { equals, required } from "../rules/generic";

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
