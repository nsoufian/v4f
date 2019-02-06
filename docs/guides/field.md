---
id: field
title: Field
---

Settings up field validation are straightforward, and all thing begins from **Field function** followed by the **type of field** you want to validate.

<!--DOCUSAURUS_CODE_TABS-->

<!--string-->

```javascript
import { Field } from "v4f"; // ES6

Field().string(); // Chain your rules after this
```

<!--number-->

```javascript
import { Field } from "v4f"; // ES6

Field().number(); // Chain your rules after this
```

<!--boolean-->

```javascript
import { Field } from "v4f"; // ES6

Field().boolean(); // Chain your rules after this
```

<!--array-->

```javascript
import { Field } from "v4f"; // ES6

Field().array(); // Chain your rules after this
```

<!--object-->

```javascript
import { Field } from "v4f"; // ES6

Field().object(); // Chain your rules after this
```

<!--any-->

```javascript
import { Field } from "v4f"; // ES6

Field().any; // Chain your rules after this
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Chaining Rules

To build the field validation, we use a model called chaining, Essentially means that you make each validation rule after one another, This creates a smooth typing experience.

```javascript
const username = Field()
	.string()
	.min(6)
	.max(10)
	.first("Fa")
	.required();
```

## Validation

To validate data, call the function **validate** with data as an argument.

```javascript
const isValid = username.validate("baduser");

// isValid equals false
```

# Not Modifier

Sometimes you might want the inverse of a rule. For example, you might want to check that something **isn't empty**, here where do modifiers come in action.

```javascript
Field()
	.string()
	.not.empty()
	.validate(""); // false
```

## Custom Message

the fundamental strength of v4f is that you can define a custom message for every rule.

```javascript
const username = Field()
	.string({
		message: "Username field must be string"
	})
	.min(6, {
		message: "Username field length must be grater that 6"
	})
	.max(10, {
		message: "Username field length must be less than 10"
	})
	.first("Fa", {
		message: "Username field must start with Fa"
	})
	.required({
		message: "Username field is required"
	});

// to get the message instead of boolean, you must turn on the verbose option to true.

const isValid = username.validate("baduser", { verbose: true });
/**
 * is valid contain "Username field must start with Fa"
 * if we pass valid data isValid will contain true
 */
```
