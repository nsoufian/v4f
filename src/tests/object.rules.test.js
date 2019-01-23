import { object } from "../rules/object";

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
