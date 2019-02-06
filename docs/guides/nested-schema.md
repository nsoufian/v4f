---
id: nested-schema
title: Nested schema
---

In V4f schema can be nested inside other schemas, this feature is handy in many situations, it can save you a lot of time and effort.

For example, we have a model address, and we made a validation schema for it in a file.

address.js

```javascript
import { Schema, Field } from "v4f";

export const Address = Schema({
	country: Field()
		.string()
		.required(),
	city: Field()
		.string()
		.required(),
	zipcode: Field()
		.number()
		.required()
});
```

> We can validate any address just by importing schema validator from address.js.

## Usage

In the real world situations, address information is not alone is embedded in other models that should have an address reference, this when nested schema comes into act.

For example, if we have a Client model that has some fields and address information.

client.js

```javascript
import { Schema, Field } from "v4f";
import { Address } from "./address";

export const Client = Schema({
	firstName: Field()
		.string()
		.required(),
	lastName: Field()
		.string()
		.required(),
	address: Address
});
```

### Validation

other.js

```javascript
import { Client } from "./client";

const data = {
	firstname: "Jhon",
	lastName: "Math",
	address: { country: "france", city: "paris", codezip: 75000 }
	// NOTE: That address attribute has object that contains all data for address
};

const isValidClient = Client.validate(data); // true

// We can Validate One Field from nested Schema
const isCodezipValid = Client.address.codezip.validate("75000"); // false, must be number

// Or Async Validation
Client.validate(data, { async: true })
	.then(values => {
		// Do somethings with values
	})
	.catch(errors => {
		// Do somethings with data
	});
```
