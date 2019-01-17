import { getValidator as get } from "../utils";
import * as rules from "../rules/number";

const number = get()(rules.number);

test("Number rule with 3 should be true", () => {
  expect(number(3)).toBe(true);
});

test("Number rule with 4.3 should be true", () => {
  expect(number(4.3)).toBe(true);
});

test("Number rule with '5' should be false", () => {
  expect(number(4.3)).toBe(true);
});

test("Number rule with true should be false", () => {
  expect(number(true)).toBe(false);
});

test("Number rule with {1:1} should be false", () => {
  expect(number({ 1: 1 })).toBe(false);
});

const between = (min, max, value) => get(min, max)(rules.between)(value);

test("between rule min 3 and max 5 with value 4 should be true", () => {
  expect(between(3, 5, 4)).toBe(true);
});

test("between rule min 3 and max 5 with value 5 should be true", () => {
  expect(between(3, 5, 5)).toBe(true);
});

test("between rule min 3 and max 5 with value 3 should be true", () => {
  expect(between(3, 5, 3)).toBe(true);
});

test("between rule min 3 and max 5 with value 2 should be false", () => {
  expect(between(3, 5, 2)).toBe(false);
});

test("between rule min 3 and max 5 with value 6 should be false", () => {
  expect(between(3, 5, 6)).toBe(false);
});
