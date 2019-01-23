export const string = value => typeof value === "string";

export const startsWith = (str, value) => value.startsWith(str);

export const endsWith = (str, value) => value.endsWith(str);

export const pattern = (re, value) => new RegExp(re, "i").test(value);
