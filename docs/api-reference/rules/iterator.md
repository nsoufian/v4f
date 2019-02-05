---
id: iterator
title: Iterator
---

Rules that can be used for validation to any type that has length propertie like [string](string.md) and [array](array.md).

## Methods

-   [lengthEquals(n, [options])](#lengthequalsn-options)
-   [lengthLess(n, [options])](#lengthlessn-options)
-   [lengthLessOrEquals(n, [options])](#lengthlessorequalsn-options)
-   [max(n, [options])](#maxn-options)
-   [lengthGreater(n, [options])](#lengthgreatern-options)
-   [lengthGreaterOrEquals(n, [options])](#lengthgreaterorequalsn-options)
-   [min(n, [options])](#minn-options)
-   [lengthBetween(min, max, [options])](#lengthbetweenmin-max-options)
-   [lengthBetweenOrEquals(min, max, [options])](#lengthbetweenorequalsmin-max-options)

## Reference

### lengthEquals(n, [options])

checks if the length of the field equals to n passed as an argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.lengthEquals(4);

field.validate("abcd"); // true
field.validate("ab"); // false
```

### lengthLess(n, [options])

checks if the length of the field strict less than n passed as an argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.lengthLess(3);

field.validate("ab"); // true
field.validate("abc"); // false
field.validate("abcl"); // false
```

### lengthLessOrEquals(n, [options])

checks if the length of the field less or equals to n passed as an argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.array()
	.lengthLessOrEquals(3);

field.validate([1, 2]); // true
field.validate([1, 2, 3]); // true
field.validate([1, 2, 3, 4]); // false
```

### max(n, [options])

alias of [lengthLessOrEquals(n, [options])](#lengthlessorequalsn-options)

### lengthGreater(n, [options])

checks if the length of the field strictly greater than n passed as an argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.lengthGreater(2);

field.validate("abc"); // true
field.validate("ab"); // false
field.validate("a"); // false
```

### lengthGreaterOrEquals(n, [options])

checks if the length of the field greater or equals to n passed as an argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";
const field = Field()
	.string()
	.lengthGreaterOrEquals(2);

field.validate("abc"); // true
field.validate("ab"); // true
field.validate("a"); // false
```

### min(n, [options])

alias of [lengthGreaterOrEquals(n, [options])](#lengthgreaterorequalsn-options)

### lengthBetween(min, max, [options])

checks if the length of the field is strictly between min and max passed as an argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.array()
	.lengthBetween(2, 4);

field.validate([1, 2, 3]); // true
field.validate([1, 2]); // false
field.validate([1, 2, 3, 4]); // false
field.validate([1, 2, 3, 4, 5]); // false
```

### lengthBetweenOrEquals(min, max, [options])

checks if the length of the field between or equals min and max passed as an argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.array()
	.lengthBetweenOrEquals(2, 4);

field.validate([1, 2, 3]); // true
field.validate([1, 2]); // true
field.validate([1, 2, 3, 4]); // true
field.validate([1, 2, 3, 4, 5]); // false
field.validate([1]); // false
```
