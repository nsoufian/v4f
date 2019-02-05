---
id: object
title: Object
---

Rules for object validation.

## Methods

-   [hasKey(key, [options])](#haskeykey-options)
-   [hasValue(value, [options])](#hasvaluevalue-options)

## Reference

### hasKey(key, [options])

checks if object field has a key given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.object()
	.hasKey("username");

field.validate({ username: "x", a: 1 }); // true
field.validate({ a: 1 }); // false
```

### hasValue(value, [options])

checks if object field has the value given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

> **NOTE :** hasValue use the strict operator === for check.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.object()
	.hasValue(4);

field.validate({ a: 4, b: 3 }); // true
field.validate({ a: 3, b: 2 }); // false
```
