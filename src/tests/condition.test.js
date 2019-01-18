import { field as Field, typeSchema, When } from "../index";

const Server = typeSchema({
  host: Field()
    .string()
    .required(),
  user: Field()
    .string()
    .required(),
  sudo: Field()
    .boolean()
    .truthy({
      when: When(
        "user",
        Field()
          .string()
          .notEquals("root")
      )
    })
    .falsy({
      when: When(
        "user",
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

const User = typeSchema({
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
      when: When(
        "isAdmin",
        Field()
          .boolean()
          .truthy()
      )
        .end(
          "isActive",
          Field()
            .boolean()
            .truthy()
        )
        .or(
          "username",
          Field()
            .string()
            .notEquals("admin")
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

test("User Schema with username user and isAdmin false and isActive false should be false", () => {
  expect(
    User.validate({
      username: "username",
      isAdmin: false,
      isActive: false,
      url: ""
    })
  ).toBe(false);
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
      username: "username",
      isAdmin: true,
      isActive: true,
      url: ""
    })
  ).toBe(false);
});