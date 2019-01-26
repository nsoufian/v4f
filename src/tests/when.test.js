import { Field, Schema, When } from "../index";

const Server = Schema({
  host: Field()
    .string()
    .required(),
  user: Field()
    .string()
    .required(),
  sudo: Field()
    .boolean()
    .falsy({
      apply: When(
        "#user",
        Field()
          .string()
          .equals("root")
      )
    })
});

test("Schema Server with user root and sudo false should be true", () => {
  expect(
    Server.validate({
      host: "192.168.2.2",
      user: "root",
      sudo: false
    })
  ).toBe(true);
});

test("Schema Server with user root and sudo true should be false", () => {
  expect(
    Server.validate({
      host: "192.168.2.2",
      user: "root",
      sudo: true
    })
  ).toBe(false);
});

test("Schema Server with user admin and sudo true should be true", () => {
  expect(
    Server.validate({
      host: "192.168.2.2",
      user: "admin",
      sudo: true
    })
  ).toBe(true);
});

test("Schema Server with user admin and sudo false should be false", () => {
  expect(
    Server.validate({
      host: "192.168.2.2",
      user: "admin",
      sudo: false
    })
  ).toBe(false);
});

const User = Schema({
  username: Field()
    .string()
    .required(),
  isAdmin: Field()
    .boolean()
    .required(),
  isActive: Field()
    .boolean()
    .required(),
  url: Field()
    .string()
    .required({
      apply: When(
        ["#isAdmin", "#isActive"],
        Field()
          .boolean()
          .truthy()
      )
        .or(
          "#username",
          Field()
            .string()
            .equals("admin")
        )
        .end(
          "#isActive",
          Field()
            .boolean()
            .truthy()
        )
    })
});

test("User Schema with username admin and isAdmin false and isActive false should be true", () => {
  expect(
    User.validate({
      username: "admin",
      isAdmin: false,
      isActive: false,
      url: ""
    })
  ).toBe(true);
});

test("User Schema with username user and isAdmin false and isActive false should be true", () => {
  expect(
    User.validate({
      username: "username",
      isAdmin: false,
      isActive: false,
      url: "http://badom"
    })
  ).toBe(true);
});

test("User Schema with username user and isAdmin true and isActive true should be true", () => {
  expect(
    User.validate({
      username: "username",
      isAdmin: true,
      isActive: true,
      url: "http://badom"
    })
  ).toBe(true);
});

test("User Schema with username user and isAdmin true and isActive true and no url should be false", () => {
  expect(
    User.validate({
      username: "admin",
      isAdmin: false,
      isActive: true
    })
  ).toBe(false);
});

const Account = Schema(
  {
    isAdmin: Field()
      .boolean()
      .required(),
    panel: Field()
      .string({ message: "string" })
      .url({ message: "url" })
      .required({
        message: "required",
        apply: When(
          "#isAdmin",
          Field()
            .boolean()
            .truthy()
        )
      })
  },
  { verbose: true }
);

test("Strict mode validate with valide data should be true", () => {
  expect(
    Account.validate({
      isAdmin: true,
      panel: "http://domain.com/panel"
    })
  ).toBe(null);
});

test("Strict mode validate with not valide data should be true", () => {
  expect(
    Account.validate({
      isAdmin: false
    })
  ).toEqual(null);
});

test("Strict mode validate with valide data should be true", () => {
  expect(
    Account.validate({
      isAdmin: false,
      panel: "http://google.com"
    })
  ).toBe(null);
});

test("Strict mode validate with not valide data should be false", () => {
  expect(
    Account.validate({
      isAdmin: true
    })
  ).toEqual({ panel: "required" });
});

test("Strict mode validate with valide data should be false", () => {
  expect(
    Account.validate({
      isAdmin: false,
      panel: "badurl"
    })
  ).toEqual({ panel: "url" });
});

test("Strict mode validate with valide data should be false", () => {
  expect(
    Account.validate({
      isAdmin: false,
      panel: 8
    })
  ).toEqual({ panel: "string" });
});
