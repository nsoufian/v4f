import { Field, Schema } from "v4f";

export default Schema(
	{
		firstName: Field()
			.string()
			.alpha({ message: "only alpha characters are allowed" })
			.required({ message: "this field is required" }),
		lastName: Field()
			.string()
			.alpha({ message: "only alpha characters are allowed" })
			.required({ message: "this field is required" }),
		username: Field()
			.string()
			.alphaNum({ message: "only alphanumeric characters are allowed" })
			.min(4, { message: "username must be at least 4 characters" })
			.max(10, { message: "username must be at max 10 character" })
			.required({ message: "this field is required" }),
		email: Field()
			.string()
			.email({ message: "enter a valid email address" })
			.required({ message: "this field is required" }),
		password: Field()
			.string()
			.not.equals(["#username"], {
				message: "password must not equals to username"
			})
			.required({ message: "this field is required" }),
		cPassword: Field()
			.string()
			.equals(["#password"], {
				message: "Confirmation password not match password"
			})
			.required({ message: "this field is required" })
	},
	{ verbose: true, async: true }
);
