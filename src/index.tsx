/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { getDifferenceObject, intersectObjects, scrollToComponent } from '@xmanscript/utils';
import { IUseFormInputProps } from './@types';
import useDebouncedValidation from './hooks/useDebouncedValidation';
import { getControlId } from './utils/validateValueWithYupSchema';
import { isAsyncFunction } from './utils/isAsyncFunction';
import validateFormValues from './utils/validateFormValues';

type SetEnableInputProps = { bindValue: any; bindvalues: any };
type RegisterParamProps = {
  setCustomValue: (value: any) => Record<string, any>;
  setEnable?: ((props: SetEnableInputProps) => boolean) | boolean;
  controlFillerFn?: (() => Promise<any>) | (() => any);
};

type RegisterOutputType = {
  id: string;
  touchedError: any;
  error: any;
  hasError: boolean;
  touched: boolean;
  enable: boolean;
  bindValue: any;
  onTouchHandler: () => void; // controls will just have to execute this function
  onChangeHandler: (e: any) => void; // controls will just have to execute this function
};

function useForm({
  initialValues,
  validationSchema,
  metaData,
  validateOnSubmit,
  touchOnChange,
  formName = '',
  submitHandler,
  scrollToErrorControl = true,
  onChangeInterceptor,
  onSubmitDataInterceptor,
  isNestedForm,
  preFillerFn,
}: IUseFormInputProps) {
  const [initial, setInitial] = React.useState(initialValues);

  const [values, setValues] = React.useState<Record<string, any>>(initial);
  const [errors, setErrors] = React.useState<Record<string, any>>({});
  const [touchedErrors, setTouchedErrors] = React.useState<Record<string, any>>({});
  const [touchedControls, setTouchedControls] = React.useState<Record<string, boolean>>({});
  const [formState, setFormState] = React.useState<Record<string, any>>({});
  const [controlEnable, setControlEnable] = React.useState<Record<string, boolean>>({});

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
          setInitial(preFillValues);
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
      debounceTime: metaData?.DEBOUNCE_TIME ? metaData.DEBOUNCE_TIME : 300,
      dependencies: [values, touchedControls],
      callback: (errorObject: Record<string, any>) => {
        // set errors for every controls
        setErrors(errorObject);

        // set error for only touched controls
        setTouchedErrors(intersectObjects(touchedControls, errorObject));
      },
    });
  }

  async function onSubmitHandler(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (isNestedForm) return;
    try {
      // validate values before submitting

      if (validationSchema) {
        const errorObject = await validateFormValues({ validationSchema, values });

        // set the error state
        setErrors(errorObject);

        // also set the touched error
        setTouchedErrors(errorObject);
        const errorKeysAfterValidation = Object.keys(errorObject);

        // set all touched controls to true
        const touchedObject = errorKeysAfterValidation?.reduce((obj, item) => ({ ...obj, [item]: true }), {});
        setTouchedControls(prev => ({ ...prev, ...touchedObject }));

        // if `scrollToErrorControl` is true and has error then we scroll to the first control with error
        if (scrollToErrorControl && Object.keys(errorObject).length) {
          scrollToComponent({
            componentId: getControlId(formName, errorObject[Object.keys(errorObject)[0]]),
            focusAfterScroll: true,
          });
        }

        // no further execution
        if (errorKeysAfterValidation.length) return;
      }

      if (submitHandler) {
        // if the `submithandler` function is asyncronous we have to wait for the operation to finish
        if (isAsyncFunction(submitHandler)) {
          // submit handler will take the package ready to perform submit action and a difference object between initial values set and package ready
          await submitHandler({
            package: onSubmitDataInterceptor ? onSubmitDataInterceptor(values) : values,
            differencePackage: onSubmitDataInterceptor
              ? getDifferenceObject(initial, onSubmitDataInterceptor(values))
              : getDifferenceObject(initial, values),
          });
        }
        // if submit handler is not asyncronous function then
        if (!isAsyncFunction(submitHandler)) {
          if (submitHandler)
            submitHandler({
              package: onSubmitDataInterceptor ? onSubmitDataInterceptor(values) : values,
              differencePackage: onSubmitDataInterceptor
                ? getDifferenceObject(initial, onSubmitDataInterceptor(values))
                : getDifferenceObject(initial, values),
            });
        }
      }
    } catch (error: any) {
      throw new Error(`Error While Submiting Form. ${error}`);
    }
  }

  function register(controlName: string, registerParamProps?: RegisterParamProps): RegisterOutputType {
    // set the control value if the controlFillerFn is supplied
    (async () => {
      if (registerParamProps?.controlFillerFn) {
        if (isAsyncFunction(registerParamProps.controlFillerFn)) {
          const controlFillerValue = await registerParamProps.controlFillerFn();
          setValues(prev => ({ ...prev, [controlName]: controlFillerValue }));
        }
        if (
          typeof registerParamProps.controlFillerFn === 'function' &&
          !isAsyncFunction(registerParamProps.controlFillerFn)
        ) {
          const controlFillerValue = registerParamProps.controlFillerFn();
          setValues(prev => ({ ...prev, [controlName]: controlFillerValue }));
        }
      }
    })();

    // function to handle touched state
    function onTouchHandler() {
      setTouchedControls(prev => ({ ...prev, [controlName]: true }));
    }

    // to handle value change
    function onChangeHandler(event: any) {
      const isOnChangeEvent = event instanceof Event || !!event.target;

      // there is `setEnable` function or value
      if (registerParamProps && registerParamProps?.setEnable) {
        setControlEnable(prev => ({
          ...prev,
          [controlName]: registerParamProps?.setEnable
            ? typeof registerParamProps.setEnable === 'function'
              ? registerParamProps.setEnable({
                  bindValue: isOnChangeEvent ? event.target.value : event,
                  bindvalues: values,
                })
              : typeof registerParamProps.setEnable === 'boolean'
              ? registerParamProps.setEnable
              : true
            : true,
        }));
      }
      // if onChangeInterceptor is applied then we transfer the flow to the interceptor and set the values returned by the interceptor to the form values
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

      // update the touched state if it is `true`
      if (touchOnChange) {
        onTouchHandler();
      }
    }
    const returnedObj = {
      id: getControlId(formName || '', controlName),
      controlName,
      touchedError: touchedErrors[controlName] || null,
      error: errors[controlName] || null,
      hasError: !!errors[controlName],
      touched: !!touchedControls[controlName],
      bindValue: values[controlName],
      onTouchHandler,
      onChangeHandler,
      enable: controlEnable[controlName] || true,
    };
    return returnedObj;
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

export default useForm;
