---
id: boolean
title: Boolean
---

Rules for boolean validation.

## Methods

-   [truthy([options])]()
-   [falsy([options])]()

## Reference

### truthy([options])

checks if the value of the boolean field equals to **true**.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.boolean()
	.truthy();

field.validate(true); // true
field.validate(false); // false
```

### falsy([options])

checks if the value of the boolean field equals to **false**.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.boolean()
	.falsy();

field.validate(false); // true
field.validate(true); // false
```
