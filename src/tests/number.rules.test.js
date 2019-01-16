import { getValidator as get } from "../utils";
import { number, between } from "../rules/number";

test("Test Boolean Type Rule", () => {
  const validator = get()(number);
  expect(validator(3)).toBe(true);
  expect(validator(3.4)).toBe(true);
  expect(validator("3")).toBe(false);
  expect(validator("true")).toBe(false);
  expect(validator("false")).toBe(false);
  expect(validator("3.3")).toBe(false);
});

test("Test Boolean Rule between", () => {
  const min = 10;
  const max = 50;
  const validator = get(min, max)(between);
  expect(validator(10)).toBe(true);
  expect(validator(50)).toBe(true);
  expect(validator(30)).toBe(true);
  expect(validator(60)).toBe(false);
  expect(validator(9)).toBe(false);
});
