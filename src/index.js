import Field from "./field";
import Schema from "./schema";
import ConditionObject from "./condition";

export const field = () => new Field();

export const When = (name, rule) => new ConditionObject().when(name, rule);

export const typeSchema = Schema;
