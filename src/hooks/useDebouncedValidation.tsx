/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Schema } from 'yup';
import { validateValueWithYupSchema } from '../utils/validateValueWithYupSchema';

interface IUseDebouncedValidationProps {
  callback: (errorObject: Record<string, any>) => void;
  dependencies: any[];
  validationSchema?: Schema<any> | ((values: Record<string, unknown>) => Record<string, any>);
  values: Record<string, any>;
  debounceTime: number;
}

export default function useDebouncedValidation({
  callback,
  dependencies,
  validationSchema,
  values,
  debounceTime,
}: IUseDebouncedValidationProps) {
  return React.useEffect(() => {
    const timerInstance = setTimeout(async () => {
      if (validationSchema) {
        let errorObject: Record<string, any> = {};

        // for yup validation schema
        if (typeof validationSchema === 'object') {
          errorObject = await validateValueWithYupSchema(validationSchema, values);
        }
        // for validation function
        if (typeof validationSchema === 'function') {
          errorObject = validationSchema(values);
        }
        // call the callback function
        callback(errorObject);
      }
    }, debounceTime || 300);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timerInstance);
  }, [...dependencies]);
}
