export const string = value => typeof value === "string";

export const first = (str, value) => value.startsWith(str);

export const last = (str, value) => value.endsWith(str);

export const pattern = (re, value) => new RegExp(re, "i").test(value);

export const email = value =>
  // Ipv4 regular RFC 3986
  {
    const expresion = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\S[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/i;
    return expresion.test(value.trim());
  };

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

export const ip = value => ipv4(value) || ipv6(value);

export const url = value =>
  //
  // Regular Expression for URL validation
  //
  // Author: Diego Perini
  // Created: 2010/12/05
  // Updated: 2018/09/12
  // License: MIT
  // https://gist.github.com/dperini/729294
  new RegExp(
    "^" +
      // protocol identifier (optional)
      // short syntax // still required
      "(?:(?:(?:https?|ftp):)\\/\\/)" +
      // user:pass BasicAuth (optional)
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broacast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
      // host & domain names, may end with dot
      // can be replaced by a shortest alternative
      // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
      "(?:" +
      "(?:" +
      "[a-z0-9\\u00a1-\\uffff]" +
      "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
      ")?" +
      "[a-z0-9\\u00a1-\\uffff]\\." +
      ")+" +
      // TLD identifier name, may end with dot
      "(?:[a-z\\u00a1-\\uffff]{2,})" +
      ")" +
      // port number (optional)
      "(?::\\d{2,5})?" +
      // resource path (optional)
      "(?:[/?#]\\S*)?" +
      "$",
    "i"
  ).test(value);

export const alpha = value => pattern("^[a-zA-Z]+$", value);

export const alphaNum = value => pattern("^[a-zA-Z0-9]+$", value);

export const num = value =>
  pattern(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/, value);

export const bool = value =>
  pattern("^((t|T)(r|R)(u|U)(e|E)|(f|F)(a|A)(l|L)(s|S)(e|E))$", value);

export const domain = value =>
  pattern(
    /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/i,
    value
  );

export const host = value => domain(value) || ipv4(value) || ipv6(value);
