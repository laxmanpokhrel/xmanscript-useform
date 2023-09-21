/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { intersectObjects } from '@xmanscript/utils';
import { IUseFormInputProps } from './@types';
import useDebouncedValidation from './hooks/useDebouncedValidation';
import { getControlId } from './utils/validateValueWithYupSchema';
import isAsyncFunction from './utils/isAsyncFunction';

type SetEnableInputProps = { bindValue: any; bindvalues: any };
type RegisterParamProps = {
  setCustomValue: (value: any) => Record<string, any>;
  setEnable: ((props: SetEnableInputProps) => boolean) | boolean;
};

type RegisterOutputType = {
  id: string;
  touchedError: any;
  error: any;
  hasError: boolean;
  touched: boolean;
  enable: boolean;
  onTouchHandler: () => void; // controls will just have to execute this function
  onChangeHandler: (e: any) => void; // controls will just have to execute this function
};

export default function useForm(
  {
    initialValues,
    validationSchema,
    metaData,
    validateOnSubmit,
    touchOnChange,
    formName,
    submitHandler,
  }: IUseFormInputProps = {
    initialValues: {},
    validateOnSubmit: false,
    metaData: { DEBOUNCE_TIME: 500 },
  }
) {
  const [values, setValues] = React.useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, any>>({});
  const [touchedErrors, setTouchedErrors] = React.useState<Record<string, any>>({});
  const [touchedControls, setTouchedControls] = React.useState<Record<string, boolean>>({});
  const [formState, setFormState] = React.useState<Record<string, any>>({});

  // validate for no validateOnSubmit
  if (!validateOnSubmit) {
    // validate values using debounced validation
    useDebouncedValidation({
      validationSchema,
      values,
      callback: (errorObject: Record<string, any>) => {
        // set errors for every controls
        setErrors(errorObject);
        // set error for only touched controls
        setTouchedErrors(intersectObjects(errorObject, touchedControls));
      },
      debounceTime: metaData?.DEBOUNCE_TIME ? metaData.DEBOUNCE_TIME : 300,
      dependencies: [values, touchedControls],
    });
  }

  async function onSubmitHandler() {
    // if the `submithandler` function is asyncronous we have to wait for the operation to finish
    if (submitHandler && isAsyncFunction(submitHandler)) {
      try {
        await submitHandler(values);
      } catch (error: any) {
        throw new Error(`Error While Submiting Form. ${error}`);
      }
    }

    // if submit handler is not asyncronous function then
    if (submitHandler && !isAsyncFunction(submitHandler)) {
      try {
        if (submitHandler) submitHandler(values);
      } catch (error: any) {
        throw new Error(`Error While Submiting Form. ${error}`);
      }
    }
  }

  function register(controlName: string, registerParamProps?: RegisterParamProps): RegisterOutputType {
    // function to handle touched state
    function onTouchHandler() {
      setTouchedControls(prev => ({ ...prev, [controlName]: true }));
    }

    // to handle value change
    function onChangeHandler(event: any) {
      const isOnChangeEvent = event instanceof Event || !!event.target;
      if (isOnChangeEvent) {
        event.stopPropagation();
        setValues(
          registerParamProps?.setCustomValue
            ? registerParamProps.setCustomValue(event.target.value)
            : event.target.value
        );
      } else {
        setValues(registerParamProps?.setCustomValue ? registerParamProps.setCustomValue(event) : event);
      }
      // update the touched state if   is `true`
      if (touchOnChange) {
        onTouchHandler();
      }
    }

    return {
      id: getControlId(formName || '', controlName),
      touchedError: touchedErrors[controlName],
      error: errors[controlName],
      hasError: !!errors[controlName],
      touched: touchedControls[controlName],
      onTouchHandler,
      onChangeHandler,
      enable:
        typeof registerParamProps?.setEnable === 'function'
          ? registerParamProps.setEnable({ bindValue: values[controlName], bindvalues: values })
          : typeof registerParamProps?.setEnable === 'boolean'
          ? registerParamProps?.setEnable
          : true,
    };
  }

  return {
    bindValues: values,
    setBindValues: setValues,
    errors,
    setErrors,
    formState,
    register,
    onSubmitHandler,
    setFormState,
  };
}
