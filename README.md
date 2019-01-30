<p align="center">
  <a href="#">
<img style="center" src="https://i.ibb.co/XVSH26K/Text-placeholder.png" width="200" height="200">
  </a>
</p>

<p align="center">
  <a href="https://circleci.com/gh/reyx7/v4f/tree/master">
     <img style="center" src="https://circleci.com/gh/reyx7/v4f/tree/master.svg?style=svg&circle-token=dd21504e80b5908041a89229c6585f112bfaef52">
  </a>
      <a href="https://codecov.io/gh/reyx7/v4f">
     <img style="center" src="https://codecov.io/gh/reyx7/v4f/branch/master/graph/badge.svg?token=tfmtpJgkJK">
  </a>
    <a href="https://badge.fury.io/js/v4f">
     <img style="center" src="https://badge.fury.io/js/v4f.svg">
  </a>

  <a href="https://badge.fury.io/js/v4f">
  <img alt="undefined" src="https://img.shields.io/bundlephobia/min/v4f.svg">
  </a>
  <a href="https://github.com/reyx7/v4f/blob/master/LICENSE">
  <img alt="undefined" src="https://img.shields.io/npm/l/v4f.svg">
  </a>
</p>


# Description :
### V4F, Validation for Forms
Javascript light library  data validations using schema types.

[Documentation](https://v4f.js.org/doc) | [Exemples](https://v4f.js.org/exemples) | [API Reference](https://v4f.js.org/api) | [Need help ?](https://v4f.js.org/help)
###  New validation library again   !

why new validation library where they exist several good ones around, sure you are completely right. but the problem with those libraries is that almost all of the theme focus in data validation and they forget the key reason why we do validation for, is that we desire to guide our users by showing them what they missing or what they doing wrong with  some pieces of information, but sadly  you end up with generic messages errors or writing code on  the top of this libraries every time you use them.

**V4F** comes to solve this problem by focusing on those two features validations and failures messages, **V4F** comes with easy and powerful syntax that feels more human that everyone can understand with more than 40+ built-in rules.

##  Features 

**Schema**: v4f use the concept of the schema types to indicate your rules that will be checked later were we need it, this notion is powerful it lets you create complex rules ones and use it multiple types.

**Nested Schema**: with v4f you can use a schema that already created inside other schemas to create complex validation.  

**Cross-field validation**: validate fields that related or depends on each other easily with a simple syntax.

**One-field validation**: Validate only one field from schema very useful in situations like instead field validation feedback.

# Getting started

###  Syntax overview with real-world example
```javascript
import {Schema, Field, When} from "v4f";

const User = Schema({
 username: Field()
  .string()
  .alphaNum()
  .required({ constraint: When("#email", Field().any.none()) }),
 email: Field()
  .string()
  .email()
  .required({ constraint: When("#username", Field().any.none()) }),
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

 - username :
	 - Must be string
	 - Must be alpha numerique
	 - Required only when email field empty or null 
 - email :
	 - Must be string
	 - Must be valid email
	 - Required only when username field empty or null 
 - password :
	 - Must be string
	 - At least 6 characters long but no more than 20
	 - Must not be equals to username and email 
	 - Required
  - cPassword :
	 - Must be string
	 - At least 6 characters long but no more than 20
	 - Must equals to password
	 - Required

## Instalation

To install the stable version:
```shell
npm install v4f
```
This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

or

```shell
yarn add v4f
```

If you you use [yarn](https://yarnpkg.com/) as package your package manager.

## Usage

#### No ES6
```javascript
var v4f = required("v4f");

const User = v4f.Schema({// Your schema here});
```
#### ES6
```javascript
import {Schema, Field} from "v4f";

const User = Schema({// Your schema here});

```
Read the [Usage Guide](https://v4f.js.org/docs/usage) on our website for detailed instructions on how to use the library.


## Contributing

In general, we follow the "fork-and-pull" Git workflow.

1.  Fork on GitHub
2.  Make changes to your own fork
3.  Submit a Pull request so that we can review your changes

## Maintainers

-   [reyx7](https://github.com/reyx7)  -  **Nassih Soufiane**  (author)


### License (MIT)
