/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Schema } from 'yup';
import validateFormValues from '../utils/validateFormValues';

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
        const errorObject: Record<string, any> = await validateFormValues({
          validationSchema,
          values,
        });

        // call the callback function
        callback(errorObject);
      }
    }, debounceTime || 300);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timerInstance);
  }, [...dependencies]);
}
