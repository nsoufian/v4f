---
id: field
title: Field
hide_title: true
---

# Field()

Creates a field to chain with your rules to build complex validation for your data.

## Example

```javascript
import { Field } from "v4f";

const username = Field()
	.string()
	.min(6) // min length 6
	.max(10) // max length is 10
	.last("z") // last char must be "z"
	.required(); // must be no empty and no null or undefined

username.validate("nassihfz"); // true

username.validate(""); // false

username.validate("abc1z"); // false
```
