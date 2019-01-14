import get from "./index";
import { boolean, falsy, truthy } from "../rules";

test("Test Boolean Rule", () => {
  const validator = get()(boolean);
  expect(validator(true)).toBe(true);
  expect(validator(false)).toBe(true);
  expect(validator("")).toBe(false);
  expect(validator("true")).toBe(false);
  expect(validator("false")).toBe(false);
  expect(validator(3)).toBe(false);
});

test("Test Boolean Rule truthy", () => {
  const validator = get()(truthy);
  expect(validator(true)).toBe(true);
  expect(validator(false)).toBe(false);
});

test("Test Boolean Rule falsy", () => {
  const validator = get()(falsy);
  expect(validator(false)).toBe(true);
  expect(validator(true)).toBe(false);
});
