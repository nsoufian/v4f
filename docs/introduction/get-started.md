---
id: get-started
title: Getting Started
---

## What's v4f?

v4f is a javascript library for data validation that encourages rapid development and clean, unlike other validation libraries v4f is designed from the ground up to be adaptable for any context, and it takes care of all your validation in different environments (client, server, native).

You can use **V4f** together with ([react.js](https://reactjs.org/), [angular.js](https://angular.io/), [vue.js](https://vuejs.org/), [jquery](https://jquery.com/)) or with any web framework.

## Why

Why new validation library where they exist several good ones around, sure you are entirely right. But the problem with those libraries is that almost all of the theme focus in data validation and they forget the key reason why we validate.
The main props of validations are that we desire to guide our users by showing them what they are missing or what they are doing wrong with some pieces of information, but sadly you end up with generic messages errors or writing code on the top of this libraries every time you use them.

**V4F** comes to solve this problem by focusing on those two features validations and failures messages by returning multiple types of errors types for various situations, and it comes with easy and powerful syntax that feels more human that everyone can understand with more than 40+ built-in rules.

## Out of the box

-   **Schema**: v4f use the concept of the schema to define your rules that will be validated were we need it, it lets you create complex validation in a declarative that seems clean and representative.

-   **Nested Schema**: with v4f you can use a schema that already created inside other schemas to create complex validation.

-   **Cross-field**: validate fields that related or depends on each other fast with a pure syntax.

-   **One-field**: Validate only one field from schema very useful in situations like instead field validation.

## Syntax overview

<!--javascript-->

```javascript
import { Schema, Field, When } from "v4f";

const User = Schema({
	username: Field()
		.string()
		.alphaNum()
		.required({
			constraint: When("#email", Field().none())
		}),
	email: Field()
		.string()
		.email()
		.required({
			constraint: When("#username", Field().none())
		}),
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

const results = User.validate({
	/** Your data here**/
});
```

The above schema defines the following constraints:

-   username :
    -   Must be string
    -   Must be alpha numeric
    -   Required when **email** field is not present
    -   Optional when **email** field is present
-   email :
    -   Must be string
    -   Must be valid email
    -   Required when **username** field is not present
    -   Optional when **username** field is present
-   password :
    -   Must be string
    -   At least 6 characters long but no more than 20
    -   Must not be equals to **username** and **email**
    -   Required
-   cPassword :
    -   Must be string
    -   Must equals to **password**
    -   Required
