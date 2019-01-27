import { Schema, Field } from "../index";

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
const User = Schema({
  username: Field()
    .string()
    .minLength(6)
    .required(),
  password: Field()
    .string()
    .minLength(6)
    .required(),
  email: Field()
    .string()
    .required(),
  isAdmin: Field()
    .boolean()
    .required(),
  url: Field()
    .string()
    .required()
});

/**
 *  Test Simple Schema Validation
 */

test("Validate Schema with no options and valide data should be true", () => {
  expect(User.validate(valideData)).toBe(true);
});

test("Validate Schema with no options and not valide data should be false", () => {
  expect(User.validate(notValideData)).toBe(false);
});

// Test Simple Validation with option async
test("Validate Schema with async option and valide data should be resolved", () =>
  User.validate(valideData, { async: true }).then(data =>
    expect(data).toBe(valideData)
  ));

test("Validate Schema with async option and not valide data should be rejected", () => {
  expect.assertions(1);
  return User.validate(notValideData, { async: true }).catch(errors => {
    expect(errors).toBeUndefined();
  });
});

/**
 *  Test Simple Schema Validation with option verbose true
 */

test("Validate Schema with message options and valide data should be null", () => {
  expect(User.validate(valideData, { verbose: true })).toBe(null);
});

test("Validate Schema with message options and not valide data should be object...", () => {
  expect(User.validate(notValideData, { verbose: true })).toEqual({
    username: "minLength",
    email: "string",
    url: "required",
    isAdmin: "boolean"
  });
});
// test With async and verbose

// Test Simple Validation with option async
test("Validate Schema with async and verbose and valide data should be resolved", () =>
  User.validate(valideData, { async: true, verbose: true }).then(data =>
    expect(data).toBe(valideData)
  ));

test("Validate Schema with async and verbose and not valide data rejected", () => {
  expect.assertions(1);
  return User.validate(notValideData, { async: true, verbose: true }).catch(
    errors => {
      expect(errors).toEqual({
        username: "minLength",
        email: "string",
        url: "required",
        isAdmin: "boolean"
      });
    }
  );
});

/**
 *  Test One Field validation from Schema
 */

test("Validate one username Field of schema with no options with 'username' should be true ", () => {
  expect(User.username.validate("username")).toBe(true);
});

test("Validate one username Field of schema with no options with 'use' should be false ", () => {
  expect(User.username.validate("username")).toBe(true);
});

/**
 *  Test Simple Schema Validation with option verbose and bool true
 */
test("Validate Schema with message options and valide data should be null", () => {
  expect(User.validate(valideData, { verbose: true })).toBe(null);
});

/**
 *  Test One Field validation from Schema with verbose option
 */

test("Validate Schema with message options and valide data should be object with all value true", () => {
  expect(User.validate(valideData, { verbose: true, bool: true })).toEqual({
    username: true,
    password: true,
    email: true,
    isAdmin: true,
    url: true
  });
});

test("Validate Schema with message options and not valide data should be object...", () => {
  expect(User.validate(notValideData, { verbose: true, bool: true })).toEqual({
    username: false,
    email: false,
    password: true,
    url: false,
    isAdmin: false
  });
});

// Test Simple Validation with option async verbose and optional

test("Validate Schema with async verbose and bool and valide data should be resolved", () =>
  User.validate(valideData, { async: true, verbose: true, bool: true }).then(
    data => expect(data).toBe(valideData)
  ));

test("Validate Schema with async verbose and bool and not valide data should rejected", () => {
  expect.assertions(1);
  return User.validate(notValideData, {
    async: true,
    verbose: true,
    bool: true
  }).catch(errors => {
    expect(errors).toEqual({
      username: false,
      email: false,
      password: true,
      url: false,
      isAdmin: false
    });
  });
});

const Address = Schema({
  country: Field()
    .string()
    .required(),
  city: Field()
    .string()
    .required(),
  zipCode: Field()
    .number()
    .between(75000, 90000, { message: "between %{value} %{field}" })
    .required()
});

const Client = Schema({
  name: Field()
    .string()
    .not.equals(["#address.country"])
    .required(),
  address: Address
});

/**
 * Test Nested Schema with no options
 */

test("Validate nested schema with no options with valide data should be true", () => {
  expect(
    Client.validate({
      name: "client",
      address: { country: "france", city: "paris", zipCode: 75020 }
    })
  ).toBe(true);
});

// Test related field validation with name equals country

test("Validate nested schema with no options with name equals city should be false", () => {
  expect(
    Client.validate({
      name: "france",
      address: { country: "france", city: "paris", zipCode: 75020 }
    })
  ).toBe(false);
});

test("Validate nested schema with no options with not valide data should be false", () => {
  expect(
    Client.validate({
      name: "client",
      address: { country: null, city: "paris", zipCode: 750 }
    })
  ).toBe(false);
});

/**
 * Test Nested Schema with option verbose, end test template message
 */

test("Validate nested schema with options verbose true with not valide data should be object...", () => {
  expect(
    Client.validate(
      {
        name: 1,
        address: { country: null, city: "paris", zipCode: 750 }
      },
      { verbose: true }
    )
  ).toEqual({
    name: "string",
    address: { country: "required", zipCode: "between 750 zipCode" }
  });
});

test("Validate nested schema with options verbose and bool with not valide data should be object...", () => {
  expect(
    Client.validate(
      {
        name: 1,
        address: { country: null, city: "paris", zipCode: 750 }
      },
      { verbose: true, bool: true }
    )
  ).toEqual({
    name: false,
    address: { country: false, zipCode: false, city: true }
  });
});

/**
 * Test one Field Nested Schema with option verbose, end test template message
 */

test("Validate one Field of nested schema with no options with valide data should be true", () => {
  expect(Client.address.zipCode.validate(75020)).toBe(true);
});

test("Validate one Field of nested schema with no options with notValide data should be true", () => {
  expect(Client.address.zipCode.validate(20)).toBe(false);
});

test("Validate one Field of nested schema with verbose options and not valide data should be 'minLength'", () => {
  expect(Client.address.zipCode.validate(20, { verbose: true })).toBe(
    "between 20"
  );
});

const Account = Schema({
  username: Field()
    .string()
    .required(),
  email: Field()
    .string()
    .required(),
  password: Field()
    .string()
    .not.equals(["#username"])
    .required(),
  passwordConfirmation: Field()
    .string()
    .equals(["#password"])
    .maxLength(["#email", value => value.length])
    .required()
});

/**
 * Test Related field and related field with callback
 */

test("Validate cross rule with password match password confirmation and password not match username should be true", () => {
  expect(
    Account.validate({
      username: "myusername",
      email: "my@mail.com",
      password: "my@mail.co",
      passwordConfirmation: "my@mail.co"
    })
  ).toBe(true);
});

test("Validate cross rule with password not match password confirmation and password not match username should be false", () => {
  expect(
    Account.validate({
      username: "myusername",
      email: "my@mail.com",
      password: "123456",
      passwordConfirmation: "12345"
    })
  ).toBe(false);
});

test("Validate cross rule with password length more than email length be false", () => {
  expect(
    Account.validate({
      username: "myusername",
      email: "my@mail.com",
      password: "myusernameoo",
      passwordConfirmation: "myusernameoo"
    })
  ).toBe(false);
});

test("Validate cross rule with password match password confirmation and password match username should be false", () => {
  expect(
    Account.validate({
      username: "myusername",
      email: "my@mail.com",
      password: "myusername",
      passwordConfirmation: "myusername"
    })
  ).toBe(false);
});
