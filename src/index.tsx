/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { intersectObjects } from '@xmanscript/utils';
import { IUseFormProps } from './@types';
import { validateValueWithYupSchema } from './utils/validateValueWithYupSchema';

export default function useForm(
  { initialValues, validationSchema, metaData, validateOnSubmit }: IUseFormProps = {
    initialValues: {},
    validateOnSubmit: false,
    metaData: { DEBOUNCE_TIME: 500 },
  }
) {
  const [values, setValues] = React.useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, any>>({});
  const [touched, _setTouched] = React.useState<Record<string, boolean>>({});
  const [formState, _setFormState] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    if (validateOnSubmit) return;
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
        // set the error object
        setErrors(intersectObjects(errorObject, touched));
      }
    }, metaData.DEBOUNCE_TIME || 500);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timerInstance);
  }, [values, touched]);

  function handleSubmit() {}

  function register() {
    return {};
  }
  return {
    bindValues: values,
    setBindValues: setValues,
    errors,
    setErrors,
    touched,
    formState,
    register,
    handleSubmit,
  };
}
