---
id: string
title: String
---

Rules for string validation.

> **NOTE :** String type can accept rules of [iterator](iterator.md).

## Methods

-   [first(str ,[options])](#fiststr-options)
-   [last(str ,[options])](#laststr-options)
-   [pattern(re ,[options])](#patternre-options)
-   [email(str ,[options])](#emailstr-options)
-   [alpha(str ,[options])](#alphastr-options)
-   [alphaNum(str ,[options])](#alphaNumstr-options)
-   [url(str ,[options])](#urlstr-options)
-   [ip(str ,[options])](#ipstr-options)
-   [ipv4(str ,[options])](#ipv4str-options)
-   [ipv6(str ,[options])](#ipv6str-options)
-   [host(str ,[options])](#hoststr-options)
-   [domain(str ,[options])](#domainstr-options)
-   [num(str ,[options])](#numstr-options)
-   [bool(bool ,[options])](#boolbool-options)

## Reference

### fist(str ,[options])

Checks if the string value of the field starts with str value given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.first("abc");

field.validate("abc"); // true
field.validate("abcfff"); // true
field.validate("bcabc"); // false
```

### last(str ,[options])

Checks if the string value of the field ends with str value given as argument.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.last("z");

field.validate("strz"); // true
field.validate("strb"); // false
field.validate("stzr"); // false
```

### pattern(re ,[options])

checks the field value against the pattern given as an argument to pattern rule.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.pattern(/^abc$/);

field.validate("abc"); // true
field.validate("ac"); // false
```

### email(str ,[options])

checks if the value of the field is a valid email.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.email();

field.validate("soufiane.nass7@gmail.com"); // true
field.validate("soufiane.nass7gmail.com"); // false
```

### alpha(str ,[options])

checks if the value of the field is a valid alpha string .

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.alpha();

field.validate("str"); // true
field.validate("s.t.r"); // false
```

### alphaNum(str ,[options])

checks if the value of the field is a valid alpha num string .

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.alphaNum();

field.validate("str"); // true
field.validate("str8"); // true
field.validate("st-r8"); // false
```

### url(str ,[options])

checks if the value of the field is a valid url.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.url();

field.validate("https://v4f.js.org"); // true
field.validate("https://google."); // false
```

### ip(str ,[options])

checks if the value of the field is a valid IP address ipv4 or ipv6.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.ip();

field.validate("192.168.2.2"); // true
field.validate("2001:db8:0000:1:1:1:1:"); // true
field.validate("0200.200.200.200"); // false
field.validate("1:1:1:1:1:1:1:1:1:1:1:1:1:1:1:1"); // false
```

### ipv4(str ,[options])

checks if the value of the field is a valid IP address ipv4.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.ipv4();

field.validate("192.168.2.2"); // true
field.validate("0200.200.200.200"); // false
```

### ipv6(str ,[options])

checks if the value of the field is a valid IP address ipv4.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.ipv6();

field.validate("2001:db8:0000:1:1:1:1:"); // true
field.validate("1:1:1:1:1:1:1:1:1:1:1:1:1:1:1:1"); // false
```

### host(str ,[options])

checks if the value of the field is a valid host.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.host();

field.validate("v4f.js.org"); // true
field.validate("v4f"); // false
```

### domain(str ,[options])

checks if the value of the field is a valid domain.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.domain();

field.validate("v4f.js.org"); // true
field.validate("_.com"); // false
```

### num(str ,[options])

checks if the value of the field is a valid number.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.num();

field.validate("99"); // true
field.validate("99.3"); // true
field.validate("-99.3"); // true
field.validate("-r"); // false
```

### bool(bool ,[options])

checks if the value of the field is a valid boolean string "true" or "false" uppercase accepted.

Optionally, you can provide a options object that can hold **message** and **constraints**.

Example :

```javascript
import { Field } from "v4f";

const field = Field()
	.string()
	.bool();

field.validate("true"); // true
field.validate("false"); // true
field.validate("TruE"); // true
field.validate("FaLsE"); // true
field.validate("foo"); // false
```
