export const string = value => typeof value === "string";

export const startsWith = (str, value) => value.startsWith(str);

export const endsWith = (str, value) => value.endsWith(str);

export const pattern = (re, value) => new RegExp(re, "i").test(value);

export const email = value =>
  // Ipv4 regular RFC 3986
  pattern(
    "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$",
    value
  );

export const ipv4 = value =>
  // Ipv4 regular RFC 3986
  pattern(
    "^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$",
    value
  );

export const ipv6 = value =>
  pattern(
    "^(?:(?:(?:[0-9A-Fa-f]{0,4}:){7}[0-9A-Fa-f]{0,4})|(?:(?:[0-9A-Fa-f]{0,4}:){6}:[0-9A-Fa-f]{0,4})|(?:(?:[0-9A-Fa-f]{0,4}:){5}:(?:[0-9A-Fa-f]{0,4}:)?[0-9A-Fa-f]{0,4})|(?:(?:[0-9A-Fa-f]{0,4}:){4}:(?:[0-9A-Fa-f]{0,4}:){0,2}[0-9A-Fa-f]{0,4})|(?:(?:[0-9A-Fa-f]{0,4}:){3}:(?:[0-9A-Fa-f]{0,4}:){0,3}[0-9A-Fa-f]{0,4})|(?:(?:[0-9A-Fa-f]{0,4}:){2}:(?:[0-9A-Fa-f]{0,4}:){0,4}[0-9A-Fa-f]{0,4})|(?:(?:[0-9A-Fa-f]{0,4}:){6}(?:(?:(?:25[0-5])|(?:2[0-4]\\d)|(?:1\\d{2})|(?:\\d{1,2}))\\.){3}(?:(?:25[0-5])|(?:2[0-4]\\d)|(?:1\\d{2})|(?:\\d{1,2})))|(?:(?:[0-9A-Fa-f]{0,4}:){0,5}:(?:(?:(?:25[0-5])|(?:2[0-4]\\d)|(?:1\\d{2})|(?:\\d{1,2}))\\.){3}(?:(?:25[0-5])|(?:2[0-4]\\d)|(?:1\\d{2})|(?:\\d{1,2})))|(?:::(?:[0-9A-Fa-f]{0,4}:){0,5}(?:(?:(?:25[0-5])|(?:2[0-4]\\d)|(?:1\\d{2})|(?:\\d{1,2}))\\.){3}(?:(?:25[0-5])|(?:2[0-4]\\d)|(?:1\\d{2})|(?:\\d{1,2})))|(?:[0-9A-Fa-f]{0,4}::(?:[0-9A-Fa-f]{0,4}:){0,5}[0-9A-Fa-f]{0,4})|(?:::(?:[0-9A-Fa-f]{0,4}:){0,6}[0-9A-Fa-f]{0,4})|(?:(?:[0-9A-Fa-f]{0,4}:){1,7}:))$",
    value
  );

export const url = value =>
  pattern(
    "^((https?|ftp)://)(S+(:S*)?@)?((?!10(.d{1,3}){3})(?!127(.d{1,3}){3})(?!169.254(.d{1,3}){2})(?!192.168(.d{1,3}){2})(?!172.(1[6-9]|2d|3[0-1])(.d{1,3}){2})([1-9]d?|1dd|2[01]d|22[0-3])(.(1?d{1,2}|2[0-4]d|25[0-5])){2}(.([1-9]d?|1dd|2[0-4]d|25[0-4]))|(([_a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(.([a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(.([a-z\u{00a1}-\u{ffff}]{2,})))(:d{2,5})?(/[^s]*)?$",
    value
  );

export const alpha = value => pattern("^[a-zA-Z]+$", value);

export const alphaNum = value => pattern("^[a-zA-Z0-9]+$", value);

export const num = value => pattern("^[0-9]+$", value);

export const bool = value =>
  pattern("^((t|T)(r|R)(u|U)(e|E)|(f|F)(a|A)(l|L)(s|S)(e|E))$", value);

export const domain = value =>
  pattern(
    "^((?=[a-z0-9-]{1,63}.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*.)+[a-z]{2,63}$",
    value
  );

export const host = value => domain(value) || ipv4(value) || ipv6(value);
