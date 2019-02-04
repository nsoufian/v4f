---
id: schema
title: Schema
---

The schema in v4f let you validate a javascript object that holds your data, it enables you to build complex validation rules that will apply to your data objects.

## Schema Creation

Schema is merely the combination of multiple field validator that we already see in this guide.

<!--DOCUSAURUS_CODE_TABS-->

<!--Without messages-->

```javascript
import { Schema, Field } from "v4f"; // ES6

const Client = Schema({
	firstName: Field()
		.string()
		.required(),
	lastName: Field()
		.string()
		.required(),
	age: Field()
		.number()
		.greater(18)
		.required(),
	email: Field()
		.string()
		.email()
		.required(),
	password: Field()
		.string()
		.min(6)
		.max(20)
		.required()
});
```

<!--With messages-->

```javascript
import { Schema, Field } from "v4f"; // ES6

const Client = Schema({
	firstName: Field()
		// %{name} it will be changed with the field name
		.string({ message: "%{name} field must be string" })
		.required({ message: "%{name} field is required" }),
	lastName: Field()
		.string({ message: "%{name} field must be string" })
		.required({ message: "%{name} field is required" }),
	age: Field()
		.number({ message: "%{name} field must be number" })
		.greater(18, { message: "You must be adult" })
		.required({ message: "%{name} field is required" }),
	email: Field()
		.string({ message: "%{name} field must be string" })
		// %{value} it will be changed with the value field
		.email({ message: "%{value} is not a valid email" })
		.required({ message: "%{name} field is required" }),
	password: Field()
		.string({ message: "%{name} field must be string" })
		.between(6, 20, {
			message: "%{name} must be between 6 and 20 characters"
		})
		.required({ message: "%{name} field is required" })
});
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Validation

let us create some data for validation.

<!--DOCUSAURUS_CODE_TABS-->

<!--Valid data-->

```javascript
const data = {
	firstName: "Nassih",
	lastName: "Soufiane",
	email: "soufiane.nass7@gmail.com",
	age: 26,
	password: "hhhhhhh"
};
const isValid = Client.validate(data); // true
```

<!--Invalid data-->

```javascript
const data = {
	firstName: "",
	lastName: "Soufiane",
	email: "soufiane.nass7",
	age: 12,
	password: "1234"
};
const isValid = Client.validate(data); // false
```

<!--END_DOCUSAURUS_CODE_TABS-->

### One field validation

sometimes you may only want to validate only one field from the schema, v4f include this functionality out of the box.

```javascript
const isValidEmail = Client.username.validate("bad@email"); // false

const isValidPassword = Client.password.validate("mypassword"); // true
```

## Options

Schema allows various options for different situations like receiving object that contains errors message rather than boolean or asynchronous rather than synchronous validation.

> **NOTE :** They are two diverse techniques to set options to the schema on **creation** or on **validation call**, the difference between the two approaches is that if you set any options on the **creation of schema** the options will be the default for all validation call, however, if you provide them on validation call the options is accurate only for that call.

<!--DOCUSAURUS_CODE_TABS-->

<!--Set options on creation-->

```javascript
const Client = Schema(
	{
		// Your rules here...
	},
	{
		// Verbose options will be enabled in all validation made by this Schema
		verbose: true
	}
);
```

<!--Set options on validation-->

```javascript
const isValid = Client.validate(data, {
	/** Your can override any options when you call validate function**/
	bool: true
});
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Verbose

Verbose option lets your schema return errors message rather than boolean.

<!--DOCUSAURUS_CODE_TABS-->

<!--Valid data-->

```javascript
const data = {
	firstName: "Nassih",
	lastName: "Soufiane",
	email: "soufiane.nass7@gmail.com",
	age: 26,
	password: "hhhhhhh"
};
// Options verbose set in validation call
const results = Client.validate(data, { verbose: true }); // null
```

> **NOTE:** results variable contain **null**, when the validation success.

<!--Invalid data-->

```javascript
const data = {
	firstName: "",
	lastName: "Soufiane",
	email: "soufiane.nass7",
	age: 12,
	password: "1234"
};
const results = Client.validate(data, { verbose: true });
```

> **NOTE :** results variable contain an **object with errors messages**, when the validation fails.

```javascript
{
    firstName: "Username field is required",
    email: "soufiane.nass7 is not a valid email",
    age:"You must be adult",
    password:"password must be between 6 and 20 characters"
 }
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Bool

Bool option lets your schema return objects contains boolean values of all fields

```javascript
const data = {
	firstName: "",
	lastName: "Soufiane",
	email: "soufiane.nass7",
	age: 12,
	password: "1234"
};
const results = Client.validate(data, { bool: true });
```

> **NOTE :** results variable contain an object with a boolean indicator for every field, **False** for **invalid fields**, and **True** for **valid fields**.

```javascript
{
    firstName:false ,
    lastName: true, // only the lastName is valid for this data
    email: false,
    age:false,
    password:false
 }
```

### Async

A very important use-case for validation might be an availability to do validation when your application does some other task that takes time. Here were option async comes into action, You will ultimately receive a Promise.

Let us recap everything we learn on this guide, with async option example.

```javascript
import { Schema, Field } from "v4f"; // ES6

const Product = Schema(
	{
		name: Field()
			.string({ message: "Name Field must be string" })
			.alpha({ message: "Name Field must be alpha" })
			.required({ message: "Name Field is required" }),
		price: Field()
			.number({ message: "Price Field must be number" })
			.required({ message: "Price Field is required" }),
		isAvailable: Field()
			.boolean({ message: "Available Field must be boolean" })
			.required({ message: "Available Field is required" })
	},
	{ verbose: true, async: true }
	// We set the options on creation all call to Schema Product will be verbose and async
);

const data = {
	// Your Data Here
};
```

Async Validation

```javascript
Product.validate(data)
	.then(results => {
		// Do something with results.
	})
	.catch(errors => {
		// Do something with errors
	});
```
