import FieldObject from "./field";
import SchemaObject from "./schema";
import WhenObject from "./when";

export const Field = () => new FieldObject();

export const When = (name, rule) => new WhenObject().when(name, rule);

export const Schema = SchemaObject;
