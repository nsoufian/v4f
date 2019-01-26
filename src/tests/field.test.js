import { Field } from "../index";

const email = Field()
  .string()
  .not.required();

test("Validate Optional string Field with value null should be true", () => {
  expect(email.validate(null)).toBe(true);
});

test("Validate Optional string Field with undefined null should be true", () => {
  expect(email.validate()).toBe(true);
});

test("Validate Optional string Field with empty string should be true", () => {
  expect(email.validate("")).toBe(true);
});

test("Validate Optional string Field with empty object should be false", () => {
  expect(email.validate({})).toBe(false);
});

test("Validate Optional string Field with empty array should be false", () => {
  expect(email.validate([])).toBe(false);
});

test("Validate Optional string Field with value not string should be false", () => {
  expect(email.validate(true)).toBe(false);
});

const bool = Field()
  .boolean()
  .not.required();

test("Validate Optional Field with value not boolean should be false", () => {
  expect(bool.validate("this is string")).toBe(false);
});

test("Validate Optional Field with value true should be true", () => {
  expect(bool.validate(true)).toBe(true);
});

const address = Field()
  .object()
  .not.required();

test("Validate Optional object Field with value null should be true", () => {
  expect(address.validate(null)).toBe(true);
});

test("Validate Optional object Field with value undefined should be true", () => {
  expect(address.validate(undefined)).toBe(true);
});

test("Validate Optional object Field with empty object should be true", () => {
  expect(address.validate({})).toBe(true);
});

test("Validate Optional object Field with empty string should be false", () => {
  expect(address.validate("")).toBe(false);
});

test("Validate Optional object Field with empty array should be false", () => {
  expect(address.validate([])).toBe(false);
});

test("Validate Optional object Field with boolean should be false", () => {
  expect(address.validate(true)).toBe(false);
});
