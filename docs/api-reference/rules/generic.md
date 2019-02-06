---
id: generic
title: Generic
---

Generic are rules that you can apply besides any type

## Methods

-   [required([options])](#required-options)
-   [none([options])](#none-options)
-   [empty([options])](#empty-options)
-   [equals(value, [options])](#equalsvalue-options)
-   [exact(value, [options])](#exactvalue-options)
-   [onOf(arr, [options])](#onofarr-options)
-   [exactOneOf(arr, [options])](#exactoneofarr-options)

## Reference

### required([options])

Marks a field as required which will not allow **undefined** and **null** or empty **string, object, array** as value.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.required();

field.validate("str"); // true
field.validate(""); // false
field.validate(undefined); // false
field.validate(null); // false
```

> **NOTE :** you can marks a field as Optional using the not modifier.

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.not.required();

field.validate("str"); // true
field.validate(""); // true
field.validate(undefined); // true
field.validate(null); // true
field.validate(9); // false, if the Field is optional and is not empty other rules are checked
```

### none([options])

Checks if the field value is a **null** or **undefined** or empty **string**, **object**, an **array**.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.object()
	.none();

field.validate({ a: 1 }); // false
field.validate(undefined); // true
field.validate(null); // true
field.validate({}); // true
field.validate(""); // false, because the type is object not string
```

### empty([options])

Checks if the field value is empty.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.empty();

field.validate(""); // true
field.validate(undefined); // false
field.validate(null); // false
field.validate("lss"); // false
```

### equals(value, [options])

Checks if the field value equals to value given as an argument to the rule.

Optionally, you can provide a options object that can hold **message** and **constraints**.

> **NOTE :** equals rule use no strict operator == for equality , see [exact](#exactvalue-options) for strict.

Example With String:

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.equals("5")
	.required();

field.validate("5"); // true
field.validate("lss"); // false
```

Example With Array:

```javascript
import { Field } from "v4f";

const field = Field()
	.array()
	.equals([3, 3, [2, 2]])
	.required();

field.validate([3, 3, [2, 2]]); // true
field.validate([2, 2]); // false
```

### exact(value, [options])

Checks if the field value equals to value given as an argument to the rule.

Optionally, you can provide a options object that can hold **message** and **constraints**.

> **NOTE :** equals rule use strict operator === for equality.

Example With String:

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.equals("5")
	.required();

field.validate("5"); // true
field.validate("lss"); // false
```

Example With Array:

```javascript
import { Field } from "v4f";

const arr = [3, 3, [2, 2]];

const field = Field()
	.array()
	.equals(arr)
	.required();

field.validate(arr); // true
field.validate([3, 3, [2, 2]]); // false
```

### onOf(arr, [options])

Checks if the field value equals to one of the values in the array given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

> **NOTE :** onOf rule use no strict operator == for equality , see [exactOneOf](#exactoneofarr-options) for strict.

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.number()
	.onOf([1, 3, 5, 7, 9]);

field.validate(1); // true
field.validate(7); // true
field.validate(4); // false
```

### exactOneOf(arr, [options])

Checks if the field value exact equals to one of the values in the array given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

> **NOTE :** onOf rule use strict operator === for equality .

Example

```javascript
import { Field } from "v4f";

const field = Field()
	.number()
	.onOf([1, 3, 5, 7, 9]);

field.validate(1); // true
field.validate(7); // true
field.validate(4); // false
```
