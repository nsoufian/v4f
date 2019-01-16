import { typeSchema, field } from "../index";

const valideData = {
  username: "username",
  password: "password",
  email: "xns@live.fr",
  isAdmin: true,
  url: "http://github.repo"
};

const notValideData = {
  username: "xns",
  password: "password",
  email: 3,
  isAdmin: "true"
};
const User = typeSchema({
  username: field()
    .string({ message: "string" })
    .minLength(6, { message: "minLength" })
    .required({ message: "required" }),
  password: field()
    .string({ message: "string" })
    .minLength(6, { message: "minLength" })
    .required({ message: "required" }),
  email: field()
    .string({ message: "string" })
    .required({ message: "required" }),
  isAdmin: field()
    .boolean({ message: "boolean" })
    .required({ message: "required" }),
  url: field()
    .string({ message: "string" })
    .required({ message: "required" })
});

const Address = typeSchema({
  country: field()
    .string({ message: "string" })
    .required({ message: "required" }),
  city: field()
    .string({ message: "string" })
    .required({ message: "required" }),
  zipCode: field()
    .number({ message: "number" })
    .required({ message: "required" })
});
const Client = typeSchema({
  name: field()
    .string({ message: "string" })
    .required({ message: "required" }),
  address: Address
});

test("Test Schema with boolean result error", () => {
  expect(User.validate(valideData)).toBe(true);
  expect(User.validate(notValideData)).toBe(false);
});

test("Test Schema with Object messages result error", () => {
  expect(User.validate(valideData, { message: true })).toBe(null);
  expect(User.validate(notValideData, { message: true })).toEqual({
    username: "minLength",
    email: "string",
    url: "string",
    isAdmin: "boolean"
  });
});

test("Test Single field from schema", () => {
  expect(User.username.validate("username")).toBe(true);
  expect(User.username.validate("use")).toBe(false);
  expect(User.username.validate(3, { message: true })).toBe("string");
  expect(User.password.validate(3)).toBe(false);
  expect(User.isAdmin.validate("true")).toBe(false);
  expect(User.isAdmin.validate(false)).toBe(true);
});

test("Test Nested schema with boolean result error", () => {
  expect(
    Client.validate({
      name: "client",
      address: { country: "france", city: "paris", zipCode: 75020 }
    })
  ).toBe(true);
  expect(
    Client.validate({
      name: "client",
      address: { country: null, city: "paris", zipCode: 750 }
    })
  ).toBe(false);
});

test("Test Nested schema with message result error", () => {
  expect(
    Client.validate(
      {
        name: 1,
        address: { country: null, city: "paris", zipCode: 750 }
      },
      { message: true }
    )
  ).toEqual({ name: "string", address: { country: "string" } });
});
