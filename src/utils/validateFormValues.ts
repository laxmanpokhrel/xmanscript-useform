/* eslint-disable no-unused-vars */
import { Schema } from 'yup';
import { validateValueWithYupSchema } from './validateValueWithYupSchema';

type ValidateFormValuesProps = {
  validationSchema: Schema<any> | ((props: Record<string, unknown>) => Record<string, any>);
  values: Record<string, any>;
};
export default function validateFormValues({ validationSchema, values }: ValidateFormValuesProps) {
  // for yup validation schema
  if (typeof validationSchema === 'object') {
    return validateValueWithYupSchema(validationSchema, values);
  }

  // for validation function
  if (typeof validationSchema === 'function') {
    return validationSchema(values);
  }
  return {};
}
