import { boolean, truthy, falsy } from "../rules/boolean";

/**
 * Test boolean rule with multiple values
 * */

test("Boolean with value false Should be true", () => {
  expect(boolean(false)).toBe(true);
});

test("Boolean with value true Should be true", () => {
  expect(boolean(true)).toBe(true);
});

test("Boolean with value '' should be false", () => {
  expect(boolean("")).toBe(false);
});

test("Boolean with value null Should be false", () => {
  expect(boolean(null)).toBe(false);
});

test("Boolean with value 3 Should be false", () => {
  expect(boolean(3)).toBe(false);
});

test("Boolean with value [2,3,4] Should be false", () => {
  expect(boolean([2, 3, 4])).toBe(false);
});

test("Boolean with value no value Should be false", () => {
  expect(boolean()).toBe(false);
});

test("Truthy with value true should be true", () => {
  expect(truthy(true)).toBe(true);
});

test("Truthy with value false should be false", () => {
  expect(truthy(false)).toBe(false);
});

test("Falsy with value true should be false", () => {
  expect(falsy(true)).toBe(false);
});

test("Falsy with value false should be true", () => {
  expect(falsy(false)).toBe(true);
});
