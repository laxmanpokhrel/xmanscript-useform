/* eslint-disable no-unused-vars */
import { validateValueWithYupSchema } from './validateValueWithYupSchema';
import { isAsyncFunction } from './isAsyncFunction';
import { ValidateFormValuesProps } from '../@types';

export default function validateFormValues({ validationSchema, values }: ValidateFormValuesProps) {
  // for yup validation schema
  if (typeof validationSchema === 'object') {
    return validateValueWithYupSchema(validationSchema, values);
  }

  // for validation function
  if (typeof validationSchema === 'function' && isAsyncFunction(validationSchema)) {
    return validationSchema(values, validateValueWithYupSchema);
  }

  if (typeof validationSchema === 'function' && !isAsyncFunction(validationSchema)) {
    return validationSchema(values);
  }
  return {};
}
