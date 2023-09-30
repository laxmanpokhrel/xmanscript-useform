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
  validateOnSubmit: boolean;
}

export default function useDebouncedValidation({
  callback,
  dependencies,
  validationSchema,
  values,
  debounceTime = 300,
  validateOnSubmit,
}: IUseDebouncedValidationProps) {
  return React.useEffect(() => {
    // do not validate if validateOnSubmit is `true`
    if (validateOnSubmit) return;

    const timerInstance = setTimeout(async () => {
      if (validationSchema) {
        const errorObject: Record<string, any> = await validateFormValues({
          validationSchema,
          values,
        });
        console.log('🚦 ~ file: useDebouncedValidation.tsx:34 ~ timerInstance ~ errorObject:', errorObject);

        // call the callback function
        callback(errorObject);
      }
    }, debounceTime);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timerInstance);
  }, [...dependencies]);
}
