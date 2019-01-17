import { getValidator as get } from "../utils";
import * as rules from "../rules/string";

const string = get()(rules.string);

test("String rule with value 'this is string' should be true ", () => {
  expect(string("this is string")).toBe(true);
});

test("String rule with value 33 should be false ", () => {
  expect(string(33)).toBe(false);
});

test("String rule with value {a:3} should be false ", () => {
  expect(string({ a: 3 })).toBe(false);
});

test("String rule with value true should be false ", () => {
  expect(string(true)).toBe(false);
});

test("String rule with value ['string'] should be false ", () => {
  expect(string(["string"])).toBe(false);
});

const startsWith = (start, value) => get(start)(rules.startsWith)(value);

test("StartsWith rule with start 'abc' and value 'abcdf' should be true", () => {
  expect(startsWith("abc", "abcd")).toBe(true);
});

test("StartsWith rule with start 'abc' and value 'fdcab' should be true", () => {
  expect(startsWith("abc", "fdcab")).toBe(false);
});

const endsWith = (end, value) => get(end)(rules.endsWith)(value);

test("StartsWith rule with end 'abc' and value 'fdabc' should be true", () => {
  expect(endsWith("abc", "fdabc")).toBe(true);
});

test("StartsWith rule with end 'abc' and value 'abcdf' should be true", () => {
  expect(endsWith("abc", "abcdf")).toBe(false);
});
