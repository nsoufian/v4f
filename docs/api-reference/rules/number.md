---
id: number
title: Number
---

Rules for number validation.

## Methods

-   [less(n, [options])](#lessn-options)
-   [lessOrEquals(n, [options])](#lessorequalsn-options)
-   [greater(n, [options])](#greatern-options)
-   [greaterOrEquals(n, [options])](#greaterorequalsn-options)
-   [positive([options])](#positive-options)
-   [negative([options])](#negative-options)
-   [between(min, max, [options])](#betweenmin-max-options)
-   [betweenOrEquals(min, max, [options])](#betweenorequalsmin-max-options)

## Reference

### less(n, [options])

checks if the value of the field is less than the value given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.number()
	.less(5);

field.validate(3); // true
field.validate(5); // false
field.validate(6); // false
```

### lessOrEquals(n, [options])

checks if the value of the field is less or equals than the value given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.number()
	.lessOrEquals(5);

field.validate(3); // true
field.validate(5); // true
field.validate(6); // false
```

### greater(n, [options])

checks if the value of the field is greater than the value given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.number()
	.greater(10);

field.validate(11); // true
field.validate(10); // false
field.validate(6); // false
```

### greaterOrEquals(n, [options])

checks if the value of the field is greater or equals than the value given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.number()
	.greaterOrEquals(10);

field.validate(11); // true
field.validate(10); // true
field.validate(6); // false
```

### positive([options])

checks if the value of the field is positive.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.number()
	.positive();

field.validate(9); // true
field.validate(0); // true
field.validate(-3); // false
```

### negative([options])

checks if the value of the field is negative.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.number()
	.negative();

field.validate(-3); // true
field.validate(0); // false
field.validate(3); // false
```

### between(min, max, [options])

checks if the value of the field is strict between the min and max values given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.number()
	.between(3, 10);

field.validate(4); // true
field.validate(3); // false
field.validate(10); // false
field.validate(22); // false
```

### betweenOrEquals(min, max, [options])

checks if the value of the field is between or equals the min and max values given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.number()
	.betweenOrEquals(3, 10);

field.validate(4); // true
field.validate(3); // true
field.validate(10); // true
field.validate(22); // false
```
