export const string = options => ({
	validator: value => typeof value === "string",
	options
});

export const required = options => ({
	validator: value => value !== "" && value !== null && value !== undefined,
	options
});
