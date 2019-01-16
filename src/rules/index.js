import * as string from "./string";
import * as array from "./array";
import * as iterator from "./iterator";
import * as number from "./number";
import * as generic from "./generic";
import * as boolean from "./boolean";
import * as object from "./object";

export default {
  ...string,
  ...array,
  ...iterator,
  ...number,
  ...generic,
  ...object,
  ...boolean
};
