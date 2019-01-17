import { getValidator as get } from "../utils";
import * as rules from "../rules/iterator";

const minLength = (min, value) => get(min)(rules.minLength)(value);

test("minLength rule with min 5 and string value 'abcde' should be true ", () => {
  expect(minLength(5, "abcde")).toBe(true);
});

test("minLength rule with min 5 and string value 'abcdef' should be true ", () => {
  expect(minLength(5, "abcdef")).toBe(true);
});

test("minLength rule with min 5 and string value 'abc' should be false ", () => {
  expect(minLength(5, "abc")).toBe(false);
});

test("minLength rule with min 5 and array value [1,2,3,4,5] should be true ", () => {
  expect(minLength(5, [1, 2, 3, 4, 5])).toBe(true);
});

test("minLength rule with min 5 and array value [1,2,3,4,5,6] should be true ", () => {
  expect(minLength(5, [1, 2, 3, 4, 5, 6])).toBe(true);
});

test("minLength rule with min 5 and array value [1,2,3] should be false ", () => {
  expect(minLength(5, [1, 2, 3])).toBe(false);
});

const maxLength = (max, value) => get(max)(rules.maxLegnth)(value);

test("maxLength rule with max 5 and string value 'abcde' should be true ", () => {
  expect(maxLength(5, "abcde")).toBe(true);
});

test("maxLength rule with max 5 and string value 'abcdef' should be false ", () => {
  expect(maxLength(5, "abcdef")).toBe(false);
});

test("maxLength rule with max 5 and string value 'abc' should be true ", () => {
  expect(maxLength(5, "abc")).toBe(true);
});

test("maxLength rule with max 5 and array value [1,2,3,4,5] should be true ", () => {
  expect(maxLength(5, [1, 2, 3, 4, 5])).toBe(true);
});

test("maxLength rule with max 5 and array value [1,2,3,4,5,6] should be false ", () => {
  expect(maxLength(5, [1, 2, 3, 4, 5, 5])).toBe(false);
});

test("maxLength rule with max 5 and array value [1,2,3] should be true ", () => {
  expect(maxLength(5, [1, 2, 3])).toBe(true);
});

const lengthEquals = (length, value) => get(length)(rules.lengthEquals)(value);

test("LegnthEquals rule with length 3 and value 'abc' should be true", () => {
  expect(lengthEquals(3, "abc")).toBe(true);
});

test("LegnthEquals rule with length 3 and array value [1,2,3] should be true", () => {
  expect(lengthEquals(3, [1, 2, 3])).toBe(true);
});

test("LegnthEquals rule with length 3 and value 'abcd' should be false", () => {
  expect(lengthEquals(3, "abcd")).toBe(false);
});

test("LegnthEquals rule with length 3 and array value [1,2,3,4] should be false", () => {
  expect(lengthEquals(3, [1, 2, 3, 4])).toBe(false);
});

const lengthBetween = (min, max, value) =>
  get(min, max, value)(rules.lengthBetween)(value);

test("LengthBetween rule with min 3, max 5 and string value 'abc' should be true ", () => {
  expect(lengthBetween(3, 5, "abc")).toBe(true);
});

test("LengthBetween rule with min 3, max 5 and string value 'abcd' should be true ", () => {
  expect(lengthBetween(3, 5, "abcd")).toBe(true);
});

test("LengthBetween rule with min 3, max 5 and string value 'abcdf' should be true ", () => {
  expect(lengthBetween(3, 5, "abcdf")).toBe(true);
});

test("LengthBetween rule with min 3, max 5 and string value 'abcdfe' should be false ", () => {
  expect(lengthBetween(3, 5, "abcdfe")).toBe(false);
});

test("LengthBetween rule with min 3, max 5 and string value 'ab' should be false ", () => {
  expect(lengthBetween(3, 5, "ab")).toBe(false);
});

test("LengthBetween rule with min 3, max 5 and array value [1,2,3] should be true ", () => {
  expect(lengthBetween(3, 5, [1, 2, 3])).toBe(true);
});

test("LengthBetween rule with min 3, max 5 and array value [1,2,3,4] should be true ", () => {
  expect(lengthBetween(3, 5, [1, 2, 3, 4])).toBe(true);
});
test("LengthBetween rule with min 3, max 5 and array value [1,2,3,4,5] should be true ", () => {
  expect(lengthBetween(3, 5, [1, 2, 3, 4, 5])).toBe(true);
});

test("LengthBetween rule with min 3, max 5 and array value [1,2,3,4,5,6] should be false ", () => {
  expect(lengthBetween(3, 5, [1, 2, 3, 4, 5, 6])).toBe(false);
});

test("LengthBetween rule with min 3, max 5 and string value [1,2] should be false ", () => {
  expect(lengthBetween(3, 5, [1, 2])).toBe(false);
});
