import get from "./index";
import { string, startsWith, endsWith } from "../rules";

test("Test String Rule", () => {
  const valideValue = "String";
  const notValideValue1 = 333;
  const notValideValue2 = {};
  const notValideValue3 = ["string"];
  const notValideValue4 = true;
  const validator = get()(string);
  expect(validator(valideValue)).toBe(true);
  expect(validator(notValideValue1)).toBe(false);
  expect(validator(notValideValue2)).toBe(false);
  expect(validator(notValideValue3)).toBe(false);
  expect(validator(notValideValue4)).toBe(false);
});

test("Test String StartsWith Rule", () => {
  const valideValue = "ValideString";
  const notValidevalue = "NotValideString";
  const startValue = "Valide";
  const validator = get(startValue)(startsWith);
  expect(validator(valideValue)).toBe(true);
  expect(validator(notValidevalue)).toBe(false);
});

test("Test String endsWith Rule", () => {
  const valideValue = "ValideStringend";
  const notValidevalue = "NotValideString";
  const endValue = "end";
  const validator = get(endValue)(endsWith);
  expect(validator(valideValue)).toBe(true);
  expect(validator(notValidevalue)).toBe(false);
});
