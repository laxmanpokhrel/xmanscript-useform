/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Schema } from 'yup';
import { scrollToComponent } from '@xmanscript/utils';
import { getControlId, validateValueWithYupSchema } from '../utils/validateValueWithYupSchema';

interface IUseDebouncedValidationProps {
  callback: (errorObject: Record<string, any>) => void;
  dependencies: any[];
  validationSchema?: Schema<any> | ((values: Record<string, unknown>) => Record<string, any>);
  values: Record<string, any>;
  debounceTime: number;
  scrollToErrorControl: boolean;
  formName: string;
}

export default function useDebouncedValidation({
  callback,
  dependencies,
  validationSchema,
  values,
  debounceTime,
  scrollToErrorControl,
  formName,
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
        // if `scrollToErrorControl` is true and has error then we scroll to the error first control with error
        if (scrollToErrorControl && Object.keys(errorObject).length) {
          scrollToComponent({
            componentId: getControlId(formName, errorObject[Object.keys(errorObject)[0]]),
            focusAfterScroll: true,
          });
        }

        // call the callback function
        callback(errorObject);
      }
    }, debounceTime || 300);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timerInstance);
  }, [...dependencies]);
}
