type Options = {
  message: string;
};

type Rules<T = any, R = any> = {
  required(options: Options): Rules<T, R> & T & R;
  equals(value: any, options: Options): Rules<T, R> & T & R;
};

type IteratorRules<T = StringRules | ArrayRules> = {
  minLength(
    value: Number,
    options: Options
  ): IteratorRules<T> & Rules<T, IteratorRules> & T;
  maxLength(
    value: Number,
    options: Options
  ): IteratorRules<T> & Rules<T, IteratorRules> & T;
  lengthEquals(
    value: Number,
    options: Options
  ): IteratorRules<T> & Rules<IteratorRules, T> & T;
  lengthBetween(
    min: Number,
    max: Number,
    options: Options
  ): IteratorRules<IteratorRules> & Rules<IteratorRules, T> & T;
};

type NumberRules = {
  between(
    min: Number,
    max: Number,
    options: Options
  ): NumberRules & Rules<NumberRules, NumberRules>;
};

type StringRules = {
  startsWith(
    startValue: String,
    options: Options
  ): StringRules &
    Rules<StringRules, IteratorRules> &
    IteratorRules<StringRules>;
  endsWith(
    endValue: String,
    options: Options
  ): StringRules &
    Rules<StringRules, IteratorRules> &
    IteratorRules<StringRules>;
};

type BooleanRules = {
  falsy(options: Options): BooleanRules & Rules<BooleanRules, BooleanRules>;
  truthy(options: Options): BooleanRules & Rules<BooleanRules, BooleanRules>;
};

type ArrayRules = {};

type Field = {
  string(
    options: Options
  ): StringRules &
    IteratorRules<StringRules> &
    Rules<StringRules, IteratorRules>;
  number(options: Options): Rules<NumberRules, NumberRules>;
  boolean(options: Options): BooleanRules & Rules<BooleanRules, BooleanRules>;
};

type Schema<T> = {
  validate(values: Object, options: Options): Object | Boolean;
} & T;

type Field = {
  validate(values: Object, options: Options): Object | Boolean;
};

export function Field(): Field;
export function Schema<T = Object>(schema: T): Schema<T>;
export function When(target: String | Array, condition: Field): When;
