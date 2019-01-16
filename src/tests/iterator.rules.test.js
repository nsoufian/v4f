import { getValidator as get } from "../utils";
import {
  minLength,
  maxLegnth,
  lengthEquals,
  lengthBetween
} from "../rules/iterator";

test("Test Iterator minLength Rule", () => {
  // Get validator with min length of 5
  const validator = get(5)(minLength);
  const stringValueValide = "value";
  const stringValueNotValide = "Not";
  const arrayValueValide = ["v", "a", "l", "u", "e"];
  const arrayValueNotValide = ["N", "o", "t"];
  expect(validator(stringValueValide)).toBe(true);
  expect(validator(stringValueNotValide)).toBe(false);
  expect(validator(arrayValueValide)).toBe(true);
  expect(validator(arrayValueNotValide)).toBe(false);
});

test("Test Iterator MaxLegnth Rule", () => {
  // Get validator with max length of 5
  const validator = get(5)(maxLegnth);
  const stringValueValide = "Not";
  const stringValueNotValide = "value5";
  const arrayValueValide = ["N", "o", "t"];
  const arrayValueNotValide = ["v", "a", "l", "u", "e", "4"];
  expect(validator(stringValueValide)).toBe(true);
  expect(validator(stringValueNotValide)).toBe(false);
  expect(validator(arrayValueValide)).toBe(true);
  expect(validator(arrayValueNotValide)).toBe(false);
});

test("Test Iterator lengthEquals Rule", () => {
  // Get validator with max length of 5
  const validator = get(5)(lengthEquals);
  const stringValueValide = "value";
  const stringValueNotValide = "value5";
  const arrayValueValide = ["1", "2", "3", "4", "5"];
  const arrayValueNotValide = ["1", "2", "3", "4", "5", "6"];
  expect(validator(stringValueValide)).toBe(true);
  expect(validator(stringValueNotValide)).toBe(false);
  expect(validator(arrayValueValide)).toBe(true);
  expect(validator(arrayValueNotValide)).toBe(false);
});

test("Test Iterator lengthEquals Rule", () => {
  // Get validator with max length of 5
  const validator = get(5, 6)(lengthBetween);
  const stringValueValide = "value6";
  const stringValueNotValide = "va";
  const arrayValueValide = ["1", "2", "3", "4", "5"];
  const arrayValueNotValide = ["1", "2", "3", "4", "5", "6", "7"];
  expect(validator(stringValueValide)).toBe(true);
  expect(validator(stringValueNotValide)).toBe(false);
  expect(validator(arrayValueValide)).toBe(true);
  expect(validator(arrayValueNotValide)).toBe(false);
});
