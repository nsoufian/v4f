<p align="center">
  <a href="#">
<img style="center" src="https://i.ibb.co/x8Z4qb2/logo.png">
  </a>
</p>

<p align="center">
  <a href="https://circleci.com/gh/web-pyjs/v4f/tree/master">
  <img alt="undefined" src="https://img.shields.io/circleci/project/github/web-pyjs/v4f/master.svg?style=flat">
  </a>
<a href="https://codecov.io/gh/web-pyjs/v4f">
  <img src="https://codecov.io/gh/web-pyjs/v4f/branch/master/graph/badge.svg" />
</a>
    <a href="https://badge.fury.io/js/v4f">
     <img style="center" src="https://badge.fury.io/js/v4f.svg">
  </a>

  <a href="https://badge.fury.io/js/v4f">
<img alt="undefined" src="https://img.shields.io/bundlephobia/minzip/v4f.svg?style=flat">
  </a>
  <a href="https://github.com/reyx7/v4f/blob/master/LICENSE">
  <img alt="undefined" src="https://img.shields.io/npm/l/v4f.svg">
  </a>
</p>

[Documentation](https://v4f.js.org/docs/introduction/get-started) | [Exemples](https://v4f.js.org/docs/introduction/examples) | [API Reference](https://v4f.js.org/docs/api-reference/api) | [Need help ?](https://v4f.js.org/help)
## Description

A javascript library for validation that encourages rapid development and clean code, unlike other validation libraries v4f is designed from the ground up to be adaptable for any context, and it takes care of all your validation in different environments (client, server, native).

You can use  **V4f**  together with ([react.js](https://reactjs.org/),  [angular.js](https://angular.io/),  [vue.js](https://vuejs.org/),  [jquery](https://jquery.com/)) or with any web framework.

### Why

why new validation library where they exist several good ones around, sure you are completely right. but the problem with those libraries is that almost all of the theme focus in data validation and they forget the key reason why we do validation for, is that we desire to guide our users by showing them what they missing or what they doing wrong with  some pieces of information, but sadly  you end up with generic messages errors or writing code on  the top of this libraries every time you use them.

**V4F** comes to solve this problem by focusing on those two features validations and failures messages, **V4F** comes with easy and powerful syntax that feels more human that everyone can understand with more than 40+ built-in rules.

### Out of the box

-  **Schema** : v4f use the concept of the schema types to indicate your rules that will be checked later were we need it, this notion is powerful it lets you create complex rules ones and use it multiple types.

-  **Nested schema** : with v4f you can use a schema that already created inside other schemas to create complex validation.  

-  **Related field** : validate fields that related or depends on each other easily with a simple syntax.

-  **Single field** : Validate only one field from schema very useful in situations like instead field validation feedback.

-  **Async-sync** : Validate your schema in asynchronous or synchronous way.

## Getting started

### Syntax overview
```javascript
import { Schema, Field } from "v4f";

const User = Schema({
 username: Field()
  .string()
  .alphaNum()
  .required(),
 email: Field()
  .string()
  .email()
  .required(),
 password: Field()
  .string()
  .min(6)
  .max(20)
  .not.equals(["#username"])
  .not.equals(["#email"])
  .required(),
 cPassword: Field()
  .string()
  .equals(["#password"])
  .required()
});

const result = User.validate(data);

```

The above schema defines the following constraints:
-   username :
    -   Must be string
    -   Must be alpha numeric
    -   Required
-   email :
    -   Must be string
    -   Must be valid email
    -   Required
-   password :
    -   Must be string
    -   At least 6 characters long but no more than 20
    -   Must not be equals to username and email
    -   Required
-   cPassword :
    -   Must be string
    -   Must equals to password
    -   Required

## Instalation

To install the stable version:
```sh
$ npm install v4f
```
This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

or

```sh
$ yarn add v4f
```

If you you use [yarn](https://yarnpkg.com/) as package your package manager.

## Usage

### Commonjs
```javascript
var v4f = required("v4f");

const User = v4f.Schema({// Your schema here});
```
### ES6
```javascript
import {Schema, Field} from "v4f";

const User = Schema({// Your schema here});

```
Read the [Usage Guide](https://v4f.js.org/docs/guides/intro) on our website for detailed instructions on how to use the library.

## Rule Reference
 - [X] [Generic](<https://v4f.js.org/docs/api-reference/rules/generic>)
	- [X] [required](<https://v4f.js.org/docs/api-reference/rules/generic#required-options>)
	- [X] [custom](<https://v4f.js.org/docs/api-reference/rules/generic#custom-options>)
	- [X] [none](<https://v4f.js.org/docs/api-reference/rules/generic#none-options>)
	- [X] [empty](<https://v4f.js.org/docs/api-reference/rules/generic#empty-options>)
	- [X] [equals](<https://v4f.js.org/docs/api-reference/rules/generic#equalsvalue-options>)
	- [X] [exact](<https://v4f.js.org/docs/api-reference/rules/generic#exactvalue-options>)
	- [X] [onOf](<https://v4f.js.org/docs/api-reference/rules/generic#onofarr-options>)
	- [X] [exactOneOf](<https://v4f.js.org/docs/api-reference/rules/generic#exactoneofarr-options>)
- [X] [String](<https://v4f.js.org/docs/api-reference/rules/string>)
	- [X] [first](<https://v4f.js.org/docs/api-reference/rules/string#fiststr-options>)
	- [X] [last](<https://v4f.js.org/docs/api-reference/rules/string#laststr-options>)
	- [X] [pattern](<https://v4f.js.org/docs/api-reference/rules/string#patternre-options>)
	- [X] [email](<https://v4f.js.org/docs/api-reference/rules/string#emailstr-options>)
	- [X] [alpha](<https://v4f.js.org/docs/api-reference/rules/string#alphastr-options>)
	- [X] [alphaNum](<https://v4f.js.org/docs/api-reference/rules/string#alphaNumstr-options>)
	- [X] [url](<https://v4f.js.org/docs/api-reference/rules/string#urlstr-options>)
	- [X] [ip](<https://v4f.js.org/docs/api-reference/rules/string#ipstr-options>)
	- [X] [ipv4](<https://v4f.js.org/docs/api-reference/rules/string#ipv4str-options>)
	- [X] [ipv6](<https://v4f.js.org/docs/api-reference/rules/string#ipv6str-options>)
	- [X] [host](<https://v4f.js.org/docs/api-reference/rules/string#hoststr-options>)
	- [X] [domain](<https://v4f.js.org/docs/api-reference/rules/string#domainstr-options>)
	- [X] [num](<https://v4f.js.org/docs/api-reference/rules/string#numstr-options>)
	- [X] [bool](<https://v4f.js.org/docs/api-reference/rules/string#boolbool-options>)
- [X] [Number](<https://v4f.js.org/docs/api-reference/rules/number>)
	- [X] [less](<https://v4f.js.org/docs/api-reference/rules/number#lessn-options>)
	- [X] [lessOrEquals](<https://v4f.js.org/docs/api-reference/rules/number#lessorequalsn-options>)
	- [X] [greater](<https://v4f.js.org/docs/api-reference/rules/number#greatern-options>)
	- [X] [greaterOrEquals](<https://v4f.js.org/docs/api-reference/rules/number#greaterorequalsn-options>)
	- [X] [positive](<https://v4f.js.org/docs/api-reference/rules/number#positive-options>)
	- [X] [negative](<https://v4f.js.org/docs/api-reference/rules/number#negative-options>)
	- [X] [between](<https://v4f.js.org/docs/api-reference/rules/number#betweenmin-max-options>)
	- [X] [betweenOrEquals](<https://v4f.js.org/docs/api-reference/rules/number#betweenorequalsmin-max-options>)
- [X] [Boolean](<https://v4f.js.org/docs/api-reference/rules/boolean>)
	- [X] [truthy](<https://v4f.js.org/docs/api-reference/rules/boolean>)
	- [X] [falsy](<https://v4f.js.org/docs/api-reference/rules/boolean>)
- [X] [Array](https://v4f.js.org/docs/api-reference/rules/array)
	- [X] [allEquals](<https://v4f.js.org/docs/api-reference/rules/array#allequalsvalue-options>)
	- [X] [allExact](<https://v4f.js.org/docs/api-reference/rules/array#allexactvalue-options>)
- [X] [Object](https://v4f.js.org/docs/api-reference/rules/object)
	- [X] [hasKey](<https://v4f.js.org/docs/api-reference/rules/object#haskeykey-options>)
	- [X] [hasValue](<https://v4f.js.org/docs/api-reference/rules/object#hasvaluevalue-options>)
- [X] [Iterator](<https://v4f.js.org/docs/api-reference/rules/iterator>)
	- [X] [lengthEquals](<https://v4f.js.org/docs/api-reference/rules/iterator#lengthequalsn-options>)
	- [X] [lengthLess](<https://v4f.js.org/docs/api-reference/rules/iterator#lengthlessn-options>)
	- [X] [lengthLessOrEquals](<https://v4f.js.org/docs/api-reference/rules/iterator#lengthlessorequalsn-options>)
	- [X] [max](<https://v4f.js.org/docs/api-reference/rules/iterator#maxn-options>)
	- [X] [lengthGreater](<https://v4f.js.org/docs/api-reference/rules/iterator#lengthgreatern-options>)
	- [X] [lengthGreaterOrEquals](<https://v4f.js.org/docs/api-reference/rules/iterator#lengthgreaterorequalsn-options>)
	- [X] [min](<https://v4f.js.org/docs/api-reference/rules/iterator#minn-options>)
	- [X] [lengthBetween](<https://v4f.js.org/docs/api-reference/rules/iterator#lengthbetweenmin-max-options>)
	- [X] [lengthBetweenOrEquals](<https://v4f.js.org/docs/api-reference/rules/iterator#lengthbetweenorequalsmin-max-options>)
- [ ] Date 
## Contributing

In general, we follow the "fork-and-pull" Git workflow.

1.  Fork on GitHub
2.  Make changes to your own fork
3.  Submit a Pull request so that we can review your changes

### Test
 ```sh
 $ yarn test
 ```

### Linter
  ```sh
 $ yarn lint
 ```
## Maintainers

-   [reyx7](https://github.com/reyx7)  -  **Nassih Soufiane**  (author)


## License (MIT)

```
MIT License

Copyright (c) 2019 soufiane nassih soufiane.nass7@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
