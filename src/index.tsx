/* eslint-disable no-unused-vars */
import * as React from 'react';

export default function useForm() {
  const [values, setValues] = React.useState<Record<string, any>>({});
  const [errors, setErrors] = React.useState<Record<string, any>>();
  const [touched, _setTouched] = React.useState<Record<string, boolean>>();
  const [formState, _setFormState] = React.useState<Record<string, any>>();

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
