---
id: schema
title: Schema
hide_title: true
---

# Schema(rules, [options])

Schema let you validate a javascript object that holds your data, it enables you to build complex validation rules that will apply to your data objects.

## Arguments :

1. Rules (Object): A plain object describing the validation rules of your schema.

1. Options (Object): A optional plain object describing the schema behavior, **by default** :
    - **verbose** : **false**, Get messages errors object rather than boolean. [Read more](../guides/schema.md#verbose)
    - **strict** : **true**, The inverse of the rules is checked in related fields. [Read more](../guides/related-field.md#strict-mode)
    - **bool** : **false**, Get Boolean indicator result. [Read more](../guides/schema.md#bool)
    - **async** : **false**, asynchronous validation get promise. [Read more](../guides/schema.md#async)

## Returns :

-   Schema (Class): A class that hold your schema with the folowing method and attributes:

    -   **validate(data, [options])** (function): Run validation on your data object.
    -   **attributes** (Field) : Your data fields.

## Example

```javascript
const User = Schema(
	{
		email: Field()
			.string({ message: "%{field} must be string" })
			.email({ message: "%{field} must be email" })
			.required({ message: "%{field} is required" }),
		password: Field()
			.string({ message: "%{field} must be string" })
			.required({ message: "%{field} is required" })
	},
	{ verbose: true }
);

let errors = User.validate({});
/**
errors object contains :
 {
  email : "email is reqruied",
  password: "password must be string"
 }
**/
errors = User.validate({ email: "valid@mail.com", password: "mypass" }); // null

// One field Validation

const isValidEmail = User.email.validate("bad@mail", { verbose: false }); // false
```
