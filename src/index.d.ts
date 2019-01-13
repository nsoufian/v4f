type Options = {
  message: string;
};

type Rules = {
  required(options: Options): Rules;
  equals(value: any, options: Options): Rules;
};

type IteratorRules<T = any> = {
  min(value: Number, options: Options): IteratorRules & Rules & T;
  max(value: Number, options: Options): IteratorRules & Rules & T;
  lengthEquals(value: Number, options: Options): IteratorRules & Rules & T;
  lengthBetween(
    min: Number,
    max: Number,
    options: Options
  ): IteratorRules & Rules & T;
};

type NumberRules = {
  between(min: Number, max: Number, options: Options): NumberRules & Rules;
};

type StringRules = {
  startsWith(startValue: String, options: Options): StringRules & Rules;
  endsWith(endValue: String, options: Options): StringRules & Rules;
};

type BaseRules = {
  string(options: Options): StringRules & IteratorRules<StringRules> & Rules;
  number(options: Options): Rules;
  boolean(options: Options): Rules;
  object(options: Options): Rules;
};

export function field(): BaseRules;
