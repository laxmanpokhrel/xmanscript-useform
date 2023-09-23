/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { getDifferenceObject, intersectObjects } from '@xmanscript/utils';
import { IUseFormInputProps } from './@types';
import useDebouncedValidation from './hooks/useDebouncedValidation';
import { getControlId } from './utils/validateValueWithYupSchema';
import { isAsyncFunction } from './utils/isAsyncFunction';

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

export default function useForm({
  initialValues,
  validationSchema,
  metaData,
  validateOnSubmit,
  touchOnChange,
  formName,
  submitHandler,
  scrollToErrorControl,
  onChangeInterceptor,
  onSubmitDataInterceptor,
  isNestedForm,
  preFillerFn,
}: IUseFormInputProps) {
  const [values, setValues] = React.useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, any>>({});
  const [touchedErrors, setTouchedErrors] = React.useState<Record<string, any>>({});
  const [touchedControls, setTouchedControls] = React.useState<Record<string, boolean>>({});
  const [formState, setFormState] = React.useState<Record<string, any>>({});
  // copy initial values to have them stored and unchanged
  let initialValueCache = initialValues;
  React.useEffect(() => {
    (async () => {
      if (preFillerFn) {
        try {
          let preFillValues: Record<string, any> = {};
          if (isAsyncFunction(preFillerFn)) {
            preFillValues = await preFillerFn();
          }
          if (!isAsyncFunction(preFillerFn)) {
            preFillValues = preFillerFn();
          }
          // set initialValueCache
          initialValueCache = preFillValues;
          setValues(preFillValues);
        } catch (error) {
          throw new Error(`Error Occured At Prefiller. ${error}`);
        }
      }
    })();
  }, []);
  // validate for no validateOnSubmit
  if (!validateOnSubmit) {
    // validate values using debounced validation
    useDebouncedValidation({
      validationSchema,
      values,
      scrollToErrorControl: scrollToErrorControl || true, // scrollToErrorControl is `true` by default
      callback: (errorObject: Record<string, any>) => {
        // set errors for every controls
        setErrors(errorObject);

        // set error for only touched controls
        setTouchedErrors(intersectObjects(touchedControls, errorObject));
      },
      debounceTime: metaData?.DEBOUNCE_TIME ? metaData.DEBOUNCE_TIME : 300,
      dependencies: [values, touchedControls],
      formName: formName || '',
    });
  }

  async function onSubmitHandler() {
    if (isNestedForm) return;
    try {
      if (submitHandler) {
        // if the `submithandler` function is asyncronous we have to wait for the operation to finish
        if (isAsyncFunction(submitHandler)) {
          // submit handler will take the package ready to perform submit action and a difference object between initial values set and package ready
          await submitHandler({
            package: onSubmitDataInterceptor ? onSubmitDataInterceptor(values) : values,
            differencePackage: onSubmitDataInterceptor
              ? getDifferenceObject(initialValueCache, onSubmitDataInterceptor(values))
              : getDifferenceObject(initialValueCache, values),
          });
        }
        // if submit handler is not asyncronous function then
        if (!isAsyncFunction(submitHandler)) {
          if (submitHandler)
            submitHandler({
              package: onSubmitDataInterceptor ? onSubmitDataInterceptor(values) : values,
              differencePackage: onSubmitDataInterceptor
                ? getDifferenceObject(initialValueCache, onSubmitDataInterceptor(values))
                : getDifferenceObject(initialValueCache, values),
            });
        }
      }
    } catch (error: any) {
      throw new Error(`Error While Submiting Form. ${error}`);
    }
  }

  function register(controlName: string, registerParamProps?: RegisterParamProps): RegisterOutputType {
    // function to handle touched state
    function onTouchHandler() {
      setTouchedControls(prev => ({ ...prev, [controlName]: true }));
    }

    // to handle value change
    function onChangeHandler(event: any) {
      // if onChangeInterceptor is applied then we transfer the flow to the interceptor and set the values returned by the interceptor to the form values
      const isOnChangeEvent = event instanceof Event || !!event.target;

      if (onChangeInterceptor) {
        let interceptedValues: Record<string, any> = {};
        if (isOnChangeEvent) {
          interceptedValues = onChangeInterceptor({
            values: {
              ...values,
              [controlName]: registerParamProps?.setCustomValue
                ? registerParamProps.setCustomValue(event.target.value)
                : event.target.value,
            },
            touchedErrors,
            errors,
            touchedControls,
          });
        } else {
          interceptedValues = onChangeInterceptor({
            values: {
              ...values,
              [controlName]: registerParamProps?.setCustomValue ? registerParamProps.setCustomValue(event) : event,
            },
            touchedErrors,
            errors,
            touchedControls,
          });
        }
        setValues(interceptedValues);
        // we do not continue executing after this
        return;
      }
      // onChangeInterceptor logic ends

      if (isOnChangeEvent) {
        event.stopPropagation();

        setValues(prev => ({
          ...prev,
          [controlName]: registerParamProps?.setCustomValue
            ? registerParamProps.setCustomValue(event.target.value)
            : event.target.value,
        }));
      } else {
        setValues(prev => ({
          ...prev,
          [controlName]: registerParamProps?.setCustomValue ? registerParamProps.setCustomValue(event) : event,
        }));
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
