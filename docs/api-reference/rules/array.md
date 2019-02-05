---
id: array
title: Array
---

Rules for array validation.

> **NOTE :** Array type can accept rules of [iterator](iterator.md).

## Methods

-   [allEquals(value, [options])](#allequalsvalue-options)
-   [allExact(value, [options])](#allexactvalue-options)

## Reference

### allEquals(value, [options])

checks if the all values of the array field is equals to the value given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

> **NOTE :** allequals use the operator == for equality.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.array()
	.allEquals(4);

field.validate([4, 4, 4]); // true
field.validate([4, "4", 4]); // true
field.validate([4, 4, 6]); // false
```

### allExact(value, [options])

checks if the all values of the array field is strict equals to the value given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

> **NOTE :** allExact use the operator === for equality.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.array()
	.allEquals(4);

field.validate([4, 4, 4]); // true
field.validate([4, "4", 4]); // false
field.validate([4, 4, 6]); // false
```
