interface Options {
  message?: string;
  constraint?: (target: "#" | ["#", "#"], condition: Field) => any;
}

type RelatedField = ["#", Function];

type Rules<T, R = T> = {
  required(options?: Options): Rules<T, R>;
  not: Rules<T, R>;
  equals(value: any | RelatedField, options?: Options): Rules<T, R>;
  exact(value: any | RelatedField, options?: Options): Rules<T, R>;
  none(options?: Options): Rules<T, R>;
  empty(options?: Options): Rules<T, R>;
  oneOf(
    value: Array<any> | Object | RelatedField,
    options?: Options
  ): Rules<T, R>;
  exactOneOf(
    value: Array<any> | Object | RelatedField,
    options?: Options
  ): Rules<T, R>;
} & T &
  R;

type IteratorRules<T = StringRules | ArrayRules> = {
  lengthEquals(value: Number | RelatedField, options?: Options): IT<T>;
  lengthLess(value: Number | RelatedField, options?: Options): IT<T>;
  lengthLessOrEquals(value: Number | RelatedField, options?: Options): IT<T>;
  max(value: Number | RelatedField, options?: Options): IT<T>;
  lengthGreater(value: Number | RelatedField, options?: Options): IT<T>;
  lengthGreaterOrEquals(value: Number | RelatedField, options?: Options): IT<T>;
  min(value: Number | RelatedField, options?: Options): IT<T>;
  lengthBetween(
    min: Number | RelatedField,
    max: Number | RelatedField,
    options?: Options
  ): IT<T>;
  lengthBetweenOrEquals(
    min: Number | RelatedField,
    max: Number | RelatedField,
    options?: Options
  ): IT<T>;
} & T;

type StringRules = {
  first(value: String | RelatedField, options?: Options): STRING;
  last(value: String | RelatedField, options?: Options): STRING;
  pattern(value: String | RelatedField, options?: Options): STRING;
  ipv4(value: String | RelatedField, options?: Options): STRING;
  ipv6(value: String | RelatedField, options?: Options): STRING;
  ip(value: String | RelatedField, options?: Options): STRING;
  url(value: String | RelatedField, options?: Options): STRING;
  alpha(value: String | RelatedField, options?: Options): STRING;
  alphaNum(value: String | RelatedField, options?: Options): STRING;
  num(value: String | RelatedField, options?: Options): STRING;
  bool(value: String | RelatedField, options?: Options): STRING;
  domain(value: String | RelatedField, options?: Options): STRING;
  host(value: String | RelatedField, options?: Options): STRING;
  email(value: String | RelatedField, options?: Options): STRING;
};

type NumberRules = {
  less(value: Number | RelatedField, options?: Options): NUBMER;
  lessOrEquals(value: Number | RelatedField, options?: Options): NUBMER;
  greater(value: Number | RelatedField, options?: Options): NUBMER;
  greaterOrEquals(value: Number | RelatedField, options?: Options): NUBMER;
  positive(value: Number | RelatedField, options?: Options): NUBMER;
  negative(value: Number | RelatedField, options?: Options): NUBMER;
  between(
    min: Number | RelatedField,
    max: Number | RelatedField,
    options?: Options
  ): NUBMER;
  betweenOrEquals(
    min: Number | RelatedField,
    max: Number | RelatedField,
    options?: Options
  ): NUBMER;
};

type ArrayRules = {
  allEquals(value: any | RelatedField, options?: Options): ARRAY;
  allExact(value: any | RelatedField, options?: Options): ARRAY;
};

type BooleanRules = {
  falsy(options?: Options): BOOLEAN;
  truthy(options?: Options): BOOLEAN;
};

type ObjectRules = {
  hasKey(value: String, options?: Options): OBJECT;
  hasValue(value: any, options?: Options): OBJECT;
};

type STRING = StringRules &
  IT<StringRules> &
  Rules<StringRules, IT<StringRules>>;

type NUBMER = NumberRules & Rules<NumberRules>;

type BOOLEAN = BooleanRules & Rules<BooleanRules>;

type OBJECT = ObjectRules & Rules<ObjectRules>;

type ARRAY = ArrayRules & IT<ArrayRules> & Rules<ArrayRules, IT<ArrayRules>>;

type IT<T> = IteratorRules<T> & Rules<T, IteratorRules<T>>;

interface Field {
  string(options?: Options): STRING;
  number(options?: Options): NUBMER;
  boolean(options?: Options): BOOLEAN;
  array(options?: Options): ARRAY;
  object(options?: Options): OBJECT;
  any: STRING & NUBMER & BOOLEAN & ARRAY & OBJECT;
}

interface V<T = any> {
  validate(
    values: Object,
    options?: { verbose: false; strict: true; bool: false; async: false }
  ): Object | Boolean;
}

export function Field(): Field;

export function Schema<T = Object>(
  schema: T,
  options?: { verbose: false; strict: true; bool: false; async: false }
): V & { [K in keyof T]: V<T> };

export function When(target: "#" | ["#", "#"], condition: Field): any;
