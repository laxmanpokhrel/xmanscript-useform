/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { intersectObjects } from '@xmanscript/utils';
import { IUseFormProps } from './@types';
import useDebouncedValidation from './hooks/useDebouncedValidation';

export default function useForm(
  { initialValues, validationSchema, metaData, validateOnSubmit }: IUseFormProps = {
    initialValues: {},
    validateOnSubmit: false,
    metaData: { DEBOUNCE_TIME: 500 },
  }
) {
  const [values, setValues] = React.useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, any>>({});
  const [touchedControls, setTouchedControls] = React.useState<Record<string, boolean>>({});
  const [formState, setFormState] = React.useState<Record<string, any>>({});

  // validate for no validateOnSubmit
  if (!validateOnSubmit) {
    // validate values using debounced validation
    useDebouncedValidation({
      validationSchema,
      values,
      callback: (errorObject: Record<string, any>) => {
        setErrors(intersectObjects(errorObject, touchedControls));
      },
      debounceTime: metaData.DEBOUNCE_TIME,
      dependencies: [values, touchedControls],
    });
  }

  function handleSubmit() {}

  function register() {
    return { setTouchedControls, touchedControls };
  }
  return {
    bindValues: values,
    setBindValues: setValues,
    errors,
    setErrors,
    formState,
    register,
    handleSubmit,
    setFormState,
  };
}
