import { getValidator as get } from "../utils";
import { required, equals } from "../rules/generic";

test("Test Generic required Rule", () => {
  const validator = get()(required);
  const valideString = "ValideStringend";
  const valideArray = ["l"];
  const valideNumber = 3;
  const valideObject = { username: "test" };
  const notValideString = "";
  const notValideArray = [];
  const notValide = undefined;
  const notValideNull = null;
  const notValideObject = {};
  expect(validator(valideString)).toBe(true);
  expect(validator(valideArray)).toBe(true);
  expect(validator(valideNumber)).toBe(true);
  expect(validator(valideObject)).toBe(true);
  expect(validator(notValideString)).toBe(false);
  expect(validator(notValideArray)).toBe(false);
  expect(validator(notValide)).toBe(false);
  expect(validator(notValideNull)).toBe(false);
  expect(validator(notValideObject)).toBe(false);
});

test("Test Generic equals Rule with String", () => {
  const validator = get("string")(equals);
  expect(validator("string")).toBe(true);
  expect(validator("")).toBe(false);
});

test("Test Generic equals Rule with Number", () => {
  const validator = get(3)(equals);
  expect(validator(3)).toBe(true);
  expect(validator(4)).toBe(false);
});

test("Test Generic equals Rule with Boolean", () => {
  const validator = get(true)(equals);
  expect(validator(true)).toBe(true);
  expect(validator(false)).toBe(false);
});

test("Test Generic equals Rule with Array", () => {
  const validator = get([1, 2, [3, 4]])(equals);
  expect(validator([1, 2, [3, 4]])).toBe(true);
  expect(validator([3, 4])).toBe(false);
});

test("Test Generic equals Rule with Object", () => {
  const value = { username: "username", pass: [2, 3] };
  const notValue = { username: "pass" };
  const validator = get({ username: "username", pass: [2, 3] })(equals);
  expect(validator(value)).toBe(true);
  expect(validator(notValue)).toBe(false);
});
