---
id: related-field
title: Related Field
---

In real-world data validation, we have complex constraints to validate the most common of them is that we hold some fields that depend on values or status of other fields.

This constraint is always hard to implement and test, **V4f** make this process more smooth by using the same techniques used in the previous guides including some syntax defined to related fields.

## Simple Related Field

### Reach other fields

Let us start by exploring the first situation when the field depends on the value of another field, Let us use the example password confirmation in web registration forms.

```javascript
import { Schema, Field } from "v4f";

const User = Schema({
	username: Field()
		.string()
		.not.equals("admin")
		.required(),
	password: Field()
		.string()
		.required(),
	passwordConfirmation: Field()
		.string()
		// Access to value of username by putting the name of the field start by # inside a array.
		.equals(["#username"])
});
```

> **NOTE :** Any rule that takes a value or more, similar as **equals** in this example can access to the value of another field by putting the name start by # in an array.

### Callback modifier

Access to other fields value is impressive, but sometimes we want to make changes before passing the value to the rule that make the check, **v4f** let you give a **callback** as the second argument in the array passed to rule .

Let us imagine that you have model Product to validate with the following constaint, the name of the product must start with the id of the product concatenated with "\_ " followed by the name of the product.

Example if product id is 77 the name must be "77_productName".

```javascript
import { Schema, Field } from "v4f";

const Product = Schema({
	id: Field()
		.number()
		.required(),
	name: Field()
		.string()
		/*
		 we use first rule to check if the field start with a given string.
		 then we pass an array to first rule to reach other field value in this case id field.
		 we pass callback as second item to the array to modify the id value.
		 the type id field is number and first rule accept only string for that we use toString
		 to value to cast it and we concat the _ to match the constaint.
		*/
		.first(["#id", value => value.toString() + "_"])
});
```

```javascript
const isValid = Product.validate({ id: 44, name: "44_iphone" }); // true
```

```javascript
const isValid = Product.validate({ id: 44, name: "iphone" }); // false
```

## When Constaints

sometimes you may want some rule to be applied when a suite of regulations is passing in one or multiple fields.

#### One fields constraint

Let us imagine that you build an application for DevOps, and you have access server data to be validated, and you have a constraints **"sudo flag should be false when the user is equals to root and true if not root"**.

```javascript
import { Schema, Field, When } from "v4f";

const adminServerAccess = Schema({
	host: Field()
		.string()
		.host()
		.required(),
	user: Field()
		.string()
		.required(),
	sudo: Field()
		.boolean()
		.falsy({
			// Any rule can accept constraint option.
			constraint: When(
				"#user",
				Field()
					.any()
					.equals("root")
			)
		})
});
```

The above schema defines the following constraints:

-   host :
    -   Must be string.
    -   Must be valid host.
    -   Required.
-   user :
    -   Must be string.
    -   Required.
-   sudo :
    -   Must be boolean
    -   **false** when user **equals to root**.
    -   **true** when user **not equals to root**.
    -   Required.

> **NOTE** : When the constraint is not true then the inverse of rule should be true.

```javascript
const isValid = adminServerAccess.validate({
	host: "localhost",
	user: "root",
	sudo: false
});

console.log(isValid); // true, because the constaint is true and rule is true.
```

```javascript
const isValid = adminServerAccess.validate({
	host: "localhost",
	user: "nassih",
	sudo: false
});

console.log(isValid); // false, because the constaint is false and the inverse of rule is false
```

#### Multiple fields constraint

Let us imagine that you build a web application, and you want to validate user information, and you have the following constraints :

-   username :
    -   Must be string.
    -   Must be alpha numeric.
-   password :
    -   Must be string
    -   At least 6 characters long.
    -   Required
-   isAdmin :
    -   Must be boolean.
    -   Required.
-   adminUrl :
    -   Must be string
    -   Must be valid url
    -   Required when **isAdmin is true** or **username equals** to admin,otherwise is optional

```javascript
import { Schema, Field, When } from "v4f";

const User = Schema({
	username: Field()
		.string()
		.alpha()
		.required(),
	password: Field()
		.string()
		.min(6)
		.required(),
	isAdmin: Field()
		.boolean()
		.required(),
	adminUrl: Field()
		.string()
		.url()
		.required({
			constraint: When(
				"#isAdmin",
				Field()
					.boolean()
					.truthy()
			).or(
				"#username",
				Field()
					.string()
					.equals("admin")
			)
		})
});
```

> **NOTE** : **When** function can be chained with **or** and **and** functions.

### Strict Mode

> The strict mode is **enabled by default** in all schema that means that the examples above are strict.

The strict mode means that every rule that had **when constraints** is valid when the constraint and rule are true, Or the constraint is false, and the inverse of the rule is true.

it's frustrating I know, but you will understand this mode in the next example.

let us defines the following constraints:

-   a :
    -   Must be boolean.
    -   Required.
-   b :
    -   Must be boolean.
    -   Must be **false** when **a** is **true**
    -   Must be **true** when **a** is **false**

```javascript
import { Schema, Field, When } from "v4f";

const Strict = Schema({
	a: Field()
		.boolean()
		.required(),
	b: Field()
		.boolean()
		.truthy({
			constraint: When(
				"#a",
				Field()
					.boolean()
					.falsy()
			)
		})
});

Strict.validate({ a: true, b: false }); // true

Strict.validate({ a: false, b: true }); // true

Strict.validate({ a: true, b: true }); // false

Strict.validate({ a: false, b: false }); // false
```

### No Strict Mode

When the strict mode is turned off , the rule is only executed when constraint is valid if not the rule is skiped.

it's very useful when you what some rule to be executed only when a constraint is
true, like field is required only if other field have certain value.

let checkout the above example with strict mode off

```javascript
import { Schema, Field, When } from "v4f";

const Strict = Schema(
	{
		a: Field()
			.boolean()
			.required(),
		b: Field()
			.boolean()
			.truthy({
				constraint: When(
					"#a",
					Field()
						.boolean()
						.falsy()
				)
			})
	},
	{ strict: false }
);

Strict.validate({ a: true, b: false }); // true

Strict.validate({ a: false, b: true }); // true

Strict.validate({ a: true, b: true }); // true

Strict.validate({ a: false, b: false }); // false
```

> **NOTE: ** When strict mode is off truthy is executed only when the constraint is true, otherwise is skiped
