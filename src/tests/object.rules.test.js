import get from "./index";
import { object } from "../rules";

test("Test Boolean Type Rule", () => {
  const validator = get()(object);
  expect(validator({})).toBe(true);
  expect(validator([])).toBe(true);
  expect(validator("3")).toBe(false);
  expect(validator("true")).toBe(false);
  expect(validator("false")).toBe(false);
  expect(validator(3)).toBe(false);
});
