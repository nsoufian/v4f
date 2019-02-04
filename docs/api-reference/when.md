---
id: when
title: When
hide_title: true
---

# When(name, field)

creates a constraint for [related field](../guides/related-field.md) validation, for a specific rule that related to other fields status.

## Arguments :

1. name (string | array): The name of related field started by **#** as string, or multiple names started by **#** in a array.
2. field ([Field](field.md)) : Field validation chain to be checked.

## Return :

-   when (When): New When instance that has (**or**, **end**) methods with the same **Arguments signature** and **Return** of When.

## Example

```javascript
import { Schema, Field, When } from "v4f";

const mySchema = Schema({
	a: Field()
		.string()
		.not.required(),
	b: Field()
		.string()
		.not.required(),
	c: Field()
		.string()
		.not.required({
			// Field c is optional when field a or b is present if not field c will be required.
			constaint: When(
				"#a",
				Field()
					.any()
					.not.none()
			).or(
				"#b",
				Field()
					.any()
					.not.none()
			)
		})
});

mySchmea.validate({ a: "value", b: "value" }); // true
mySchmea.validate({ a: "value" }); // true
mySchmea.validate({ b: "value" }); // true
mySchmea.validate({ c: "value" }); // true
mySchmea.validate({}); // false
```
