<p align="center">
  <a href="#">
<img style="center" src="https://i.ibb.co/x8Z4qb2/logo.png">
  </a>
</p>

<p align="center">
  <a href="https://circleci.com/gh/web-pyjs/v4f/tree/master">
  <img alt="undefined" src="https://img.shields.io/circleci/project/github/web-pyjs/v4f/master.svg?style=flat">
  </a>
   <a href="https://codecov.io/gh/reyx7/v4f">
     <img style="center" src="https://codecov.io/gh/reyx7/v4f/branch/master/graph/badge.svg?token=tfmtpJgkJK">
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
# Description :
### V4F

v4f is a javascript library for data validation that encourages rapid development and clean, unlike other validation libraries v4f is designed from the ground up to be adaptable for any context, and it takes care of all your validation in different environments (client, server, native).

You can use  **V4f**  together with ([react.js](https://reactjs.org/),  [angular.js](https://angular.io/),  [vue.js](https://vuejs.org/),  [jquery](https://jquery.com/)) or with any web framework.


###  Why !

why new validation library where they exist several good ones around, sure you are completely right. but the problem with those libraries is that almost all of the theme focus in data validation and they forget the key reason why we do validation for, is that we desire to guide our users by showing them what they missing or what they doing wrong with  some pieces of information, but sadly  you end up with generic messages errors or writing code on  the top of this libraries every time you use them.

**V4F** comes to solve this problem by focusing on those two features validations and failures messages, **V4F** comes with easy and powerful syntax that feels more human that everyone can understand with more than 40+ built-in rules.

##  Out of the box

**Schema** : v4f use the concept of the schema types to indicate your rules that will be checked later were we need it, this notion is powerful it lets you create complex rules ones and use it multiple types.

**Nested Schema** : with v4f you can use a schema that already created inside other schemas to create complex validation.  

**Related Field** : validate fields that related or depends on each other easily with a simple syntax.

**One-field** : Validate only one field from schema very useful in situations like instead field validation feedback.

# Getting started

###  Syntax overview
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
    -   Must not be equals to  **username**  and  **email**
    -   Required
-   cPassword :
    -   Must be string
    -   Must equals to  **password**
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

#### Commonjs
```javascript
var v4f = required("v4f");

const User = v4f.Schema({// Your schema here});
```
#### ES6
```javascript
import {Schema, Field} from "v4f";

const User = Schema({// Your schema here});

```
Read the [Usage Guide](https://v4f.js.org/docs/guides/intro) on our website for detailed instructions on how to use the library.


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


### License (MIT)

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
