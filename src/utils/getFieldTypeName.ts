import { Arg, Field } from '../common-types/schema.types';

export const getFieldTypeName = (field: Field | Arg) => {
  return (
    field.type.name ||
    field.type.ofType?.name ||
    field.type.ofType?.ofType?.name ||
    field.type.ofType?.ofType?.ofType?.name
  );
};
