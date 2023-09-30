/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { getDifferenceObject, intersectObjects, scrollToComponent } from '@xmanscript/utils';
import { IUseFormInputProps, RegisterOutputType, RegisterParamProps, UseFormOutputType, formStateType } from './@types';
import useDebouncedValidation from './hooks/useDebouncedValidation';
import { getControlId } from './utils/validateValueWithYupSchema';
import { isAsyncFunction } from './utils/isAsyncFunction';
import validateFormValues from './utils/validateFormValues';
import FormProvider from './context/FormProvider';
import formContext from './context/formContext';
import { defaultFormState } from './constants';
import useFormState from './hooks/useFormState';

function useForm({
  initialValues,
  validationSchema,
  metaData,
  validateOnSubmit,
  touchOnChange,
  formName,
  submitHandler,
  scrollToErrorControl = true,
  onChangeInterceptor,
  onSubmitDataInterceptor,
  isNestedForm,
  preFillerFn,
  controlFillers,
}: IUseFormInputProps): UseFormOutputType {
  const [initial, setInitial] = React.useState(initialValues);
  const [values, setValues] = React.useState<Record<string, any>>(initial);
  const [errors, setErrors] = React.useState<Record<string, any>>({});
  const [touchedErrors, setTouchedErrors] = React.useState<Record<string, any>>({});
  const [touchedControls, setTouchedControls] = React.useState<Record<string, boolean>>({});
  const [controlEnable, setControlEnable] = React.useState<Record<string, boolean>>({});

  const [formState, setFormState] = React.useState<formStateType>(defaultFormState);
  const [controlfilling, setControlfilling] = React.useState<Record<string, boolean>>({});

  const formContextState = React.useContext(formContext);
  React.useEffect(() => {
    // register form to context
    formContextState?.registerFormToContext(formName);
  }, []);

  // handle prefilling form and control prefilling
  React.useEffect(() => {
    (async () => {
      if (preFillerFn) {
        try {
          let preFillValues: Record<string, any> = {};
          if (isAsyncFunction(preFillerFn)) {
            // set prefilling state
            setFormState(prev => ({ ...prev, isPreFilling: true }));

            // update state to context as well
            formContextState?.updateFormState({ formName, update: { isPreFillingForm: true } });

            // get the prefill values
            preFillValues = await preFillerFn();

            // set prefilling state
            setFormState(prev => ({ ...prev, isPreFilling: false }));

            // update to context as well
            formContextState?.updateFormState({ formName, update: { isPreFillingForm: false } });
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

    // set the control value if the controlFillers is supplied
    if (controlFillers) {
      Object.entries(controlFillers).map(async ([key, value]) => {
        if (isAsyncFunction(value)) {
          // set control filling to true
          setControlfilling(prev => ({ ...prev, [key]: true }));

          // set the form state too
          setFormState(prev => ({ ...prev, isControlPreFilling: true }));

          // update to context as well
          formContextState?.updateFormState({ formName, update: { isControlFilling: true } });

          // get values from controlFillerFn
          const controlFillerValue = await value();

          // set the received value
          setValues(prev => ({ ...prev, [key]: controlFillerValue }));

          // set the initial to find the different object for submit handler
          setInitial(prev => ({ ...prev, [key]: controlFillerValue }));

          // set control filling to false
          setControlfilling(prev => ({ ...prev, [key]: false }));

          // set the form state too
          setFormState(prev => ({ ...prev, isControlFilling: false }));

          // update to context as well
          formContextState?.updateFormState({ formName, update: { isControlFilling: false } });
        }
        if (typeof value === 'function' && !isAsyncFunction(value)) {
          // get values from controlFillerFn
          const controlFillerValue = value();

          // set the received value
          setValues(prev => ({ ...prev, [key]: controlFillerValue }));

          // set the initial to find the different object for submit handler
          setInitial(prev => ({ ...prev, [key]: controlFillerValue }));
        }
      });
    }
  }, []);

  // if (!validateOnSubmit) {
  // validate values using debounced validation
  useDebouncedValidation({
    validationSchema,
    values,
    debounceTime: metaData?.DEBOUNCE_TIME ? metaData.DEBOUNCE_TIME : 300,
    dependencies: [values, touchedControls],
    validateOnSubmit: !!validateOnSubmit,
    callback: (errorObject: Record<string, any>) => {
      // set errors for every controls
      setErrors(errorObject);

      // set form error state
      setFormState(prev => ({ ...prev, hasError: !!Object.keys(errorObject).length }));

      // update to context as well
      formContextState?.updateFormState({ formName, update: { hasError: !!Object.keys(errorObject).length } });

      // set error for only touched controls
      setTouchedErrors(intersectObjects(touchedControls, errorObject));
    },
  });
  // }

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

        // set form error state
        setFormState(prev => ({ ...prev, hasError: !!Object.keys(errorObject).length }));

        // update to context as well
        formContextState?.updateFormState({ formName, update: { hasError: !!Object.keys(errorObject).length } });

        // also set the touched error
        setTouchedErrors(errorObject);
        const errorKeysAfterValidation = Object.keys(errorObject);

        // set all touched controls to true
        const touchedStateObject = errorKeysAfterValidation?.reduce((obj, item) => ({ ...obj, [item]: true }), {});

        // set the state of touched control with touchedObject
        setTouchedControls(prev => ({ ...prev, ...touchedStateObject }));

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
          // set submitting status
          setFormState(prev => ({ ...prev, isSubmitting: true }));

          // update to context as well
          formContextState?.updateFormState({ formName, update: { isSubmitting: true } });

          // submit handler will take the packet ready to perform submit action and a difference object between initial values set and packet ready
          await submitHandler({
            currentPacket: onSubmitDataInterceptor ? onSubmitDataInterceptor(values) : values,
            differencePacket: onSubmitDataInterceptor
              ? getDifferenceObject(initial, onSubmitDataInterceptor(values))
              : getDifferenceObject(initial, values),
            initialPacket: initial,
          });

          // set submitting status
          setFormState(prev => ({ ...prev, isSubmitting: false }));

          // update to context as well
          formContextState?.updateFormState({ formName, update: { isSubmitting: false } });
        }

        // if submit handler is not asyncronous function then
        if (!isAsyncFunction(submitHandler)) {
          if (submitHandler)
            submitHandler({
              currentPacket: onSubmitDataInterceptor ? onSubmitDataInterceptor(values) : values,
              differencePacket: onSubmitDataInterceptor
                ? getDifferenceObject(initial, onSubmitDataInterceptor(values))
                : getDifferenceObject(initial, values),
              initialPacket: initial,
            });
        }
      }
      // set submition status
      setFormState(prev => ({ ...prev, submitionError: false }));

      // update to context as well
      formContextState?.updateFormState({ formName, update: { submitionError: false } });
    } catch (error: any) {
      // set submition status
      setFormState(prev => ({ ...prev, submitionError: true }));

      // update to context as well
      formContextState?.updateFormState({ formName, update: { submitionError: true } });
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

        // also set the context
        formContextState?.updateFormData({ formName, update: { interceptedValues } });
        // we do not continue executing after this
        return;
      }
      // onChangeInterceptor logic ends

      // if argument is an event
      if (isOnChangeEvent) {
        event.stopPropagation();
        const valuesToUpdate = {
          ...values,
          [controlName]: registerParamProps?.setCustomValue
            ? registerParamProps.setCustomValue(event.target.value)
            : event.target.value,
        };
        // update the values
        setValues(valuesToUpdate);

        // also set the context
        formContextState?.updateFormData({ formName, update: { valuesToUpdate } });
      } else {
        const valuesToUpdate = {
          ...values,
          [controlName]: registerParamProps?.setCustomValue ? registerParamProps.setCustomValue(event) : event,
        };
        // update the values
        setValues(valuesToUpdate);

        // also set the context
        formContextState?.updateFormData({ formName, update: { valuesToUpdate } });
      }

      // update the touched state if it is `true`
      if (touchOnChange) {
        onTouchHandler();
      }
    }
    // expect event listeners other attributes should be in small case because they will be passed to our components as probs
    return {
      id: getControlId(formName || '', controlName),
      controlname: controlName,
      touchederror: touchedErrors[controlName] || null,
      error: errors[controlName] || null,
      haserror: !!errors[controlName],
      touched: !!touchedControls[controlName],
      bindvalue: values[controlName],
      value: values[controlName],
      onTouchHandler,
      onChangeHandler,
      onChange: onChangeHandler,
      enable: controlEnable[controlName] || true,
      controlfilling: controlfilling[controlName] || false,
    };
  }

  return {
    bindValues: values,
    setBindValues: setValues,
    errors,
    setErrors,
    touchedErrors,
    formState,
    register,
    onSubmitHandler,
    setFormState,
  };
}

export { useForm, FormProvider, useFormState };
