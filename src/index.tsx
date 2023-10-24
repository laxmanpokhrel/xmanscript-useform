/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { getDifferenceObject, intersectObjects, scrollToComponent } from '@xmanscript/utils';
import {
  ISandBoxObject,
  IUseFormInputProps,
  IRegisterOutputProps,
  RegisterParamProps,
  UseFormOutputType,
  formStateType,
} from './@types';
import useDebouncedValidation from './hooks/useDebouncedValidation';
import { getControlId } from './utils/validateValueWithYupSchema';
import { isAsyncFunction } from './utils/isAsyncFunction';
import validateFormValues from './utils/validateFormValues';
import FormProvider from './context/FormProvider';
import formContext from './context/formContext';
import { defaultFormState } from './constants';
import useFormContextData from './hooks/useFormContextData';

function useForm({
  formName,
  initialValues,
  validationSchema,
  settings,
  validateOnSubmit,
  touchOnChange,
  submitHandler,
  scrollToErrorControl = true,
  onChangeInterceptor,
  onSubmitDataInterceptor,
  isNestedForm,
  // preFillerFn,
  // controlFillers,
  preFill,
  parcel,
  persistValues,
}: IUseFormInputProps): UseFormOutputType {
  const [initial, setInitial] = React.useState(initialValues);
  const [values, setValues] = React.useState<Record<string, any>>(initial);
  const [errors, setErrors] = React.useState<Record<string, any>>({});
  const [touchedErrors, setTouchedErrors] = React.useState<Record<string, any>>({});
  const [touchedControls, setTouchedControls] = React.useState<Record<string, boolean>>({});
  const [controlEnable, setControlEnable] = React.useState<Record<string, boolean>>({});
  const [formState, setFormState] = React.useState<formStateType>(defaultFormState);
  const [controlFilling, setControlFilling] = React.useState<Record<string, boolean>>({});

  const formContextState = React.useContext(formContext);

  // function to reset form
  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setTouchedErrors({});
    setTouchedControls({});
    formContextState?.initializeFormToContext(formName);
  }

  const sandBoxObject: ISandBoxObject = {
    setValues,
    setErrors,
    setTouchedControls,
    setTouchedErrors,
    setControlEnable,
    setFormState,
    setControlFilling,
    resetForm,
    parcel: parcel || null,
  };

  // for persisting or initializing form values
  React.useEffect(() => {
    if (!formContextState) console.error('Persisting values works within a component wrapped with FormProvider only.');
    if (persistValues && formContextState) {
      // register form to context
      // get the form values from the context
      const valuesFromContext = formContextState.formContextData[formName]?.values || {};
      setValues(valuesFromContext);
    } else {
      formContextState?.initializeFormToContext(formName);
    }

    // set the empty metadata of the form
    formContextState?.setMetaData(formName, {});

    // set the sandBox object of the form
    formContextState?.setFormSandBoxObject({ formName, sandBoxObject });
  }, []);

  // update the errors of the context when errors change
  React.useEffect(() => {
    if (!formContextState) return;
    formContextState?.updateFormErrors({ formName, update: errors });
  }, [errors]);

  // update the touchedErrors of the context when touchedErrors change
  React.useEffect(() => {
    if (!formContextState) return;
    formContextState?.updateFormTouchedErrors({ formName, update: touchedErrors });
  }, [touchedErrors]);

  // update the values of the context when values change
  React.useEffect(() => {
    if (!formContextState) return;
    formContextState?.updateFormValues({ formName, update: values });
  }, [values]);

  // update the state of the  context when state changes
  React.useEffect(() => {
    if (!formContextState) return;
    formContextState?.updateFormState({ formName, update: formState });
  }, [formState]);

  React.useEffect(() => {
    (async () => {
      const hasPreFiller = preFill?.formPreFiller != null;
      const hasControlFillers =
        typeof preFill?.controlFiller === 'object' && Object.keys(preFill?.formPreFiller).length > 0;

      // if the form is already prefilled we do not prefill it again, if donw we'll loose the previous context of the changes in the form
      if ((hasPreFiller || hasControlFillers) && !formContextState?.metaData[formName]?.isFormPrefilled) {
        try {
          // Begin setting isPreFillingForm state
          setFormState(prev => ({ ...prev, isPreFillingForm: true }));
          const { fn } = preFill.formPreFiller;
          let preFillValues = {};

          // run only if forPreFiller is enable
          if (hasPreFiller && preFill.formPreFiller.enable) {
            if (isAsyncFunction(fn)) {
              // get the prefill values asynchronously
              preFillValues = await fn();
            } else {
              preFillValues = fn();
            }
          }

          if (hasControlFillers) {
            const controlFillerPromises = Object.entries(preFill.controlFiller).map(async ([key, value]) => {
              if (value.enable && isAsyncFunction(value.fn)) {
                // set control filling to true
                setControlFilling(prev => ({ ...prev, [key]: true }));

                // get values from controlFillerFn asynchronously
                const controlFillerValue = await value.fn();

                // set the received value
                setValues(prev => ({ ...prev, [key]: controlFillerValue }));

                // set the initial to find the different object for submit handler
                setInitial(prev => ({ ...prev, [key]: controlFillerValue }));

                // set control filling to false
                setControlFilling(prev => ({ ...prev, [key]: false }));
              }
              if (value.enable && typeof value.fn === 'function' && !isAsyncFunction(value.fn)) {
                // get values from controlFillerFn synchronously
                const controlFillerValue = value.fn();

                // set the received value
                setValues(prev => ({ ...prev, [key]: controlFillerValue }));

                // set the initial to find the different object for submit handler
                setInitial(prev => ({ ...prev, [key]: controlFillerValue }));
              }
            });

            // Wait for all controlFillerPromises to complete
            await Promise.all(controlFillerPromises);
          }

          // for internal use only
          formContextState?.setMetaData(formName, { isFormPrefilled: true });
          // Update initial and values
          setInitial(preFillValues);
          setValues(preFillValues);
        } catch (error) {
          formContextState?.setMetaData(formName, { isFormPrefilled: false });
          throw new Error(`Error Occurred. ${error}`);
        } finally {
          // Always set isPreFillingForm to false when done
          setFormState(prev => ({ ...prev, isPreFillingForm: false }));
        }
      }
    })();
  }, []);

  // get the debounce time for debounce validateion
  const debounceTIme = settings?.DEBOUNCE_TIME || formContextState?.settings.DEBOUNCE_TIME || 300;
  // validate values using debounced validation
  useDebouncedValidation({
    validationSchema,
    values,
    debounceTime: debounceTIme,
    validateOnSubmit: !!validateOnSubmit,
    callback: (errorObject: Record<string, any>) => {
      // set errors for every controls
      setErrors(errorObject);

      // set form error state
      setFormState(prev => ({ ...prev, hasError: !!Object.keys(errorObject).length }));

      // set error for only touched controls
      setTouchedErrors(intersectObjects(touchedControls, errorObject));
    },
    dependencies: [values, touchedControls],
  });

  async function onSubmitHandler(
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    // if (e is React.FormEvent<HTMLFormElement> || e instanceof React.MouseEvent<HTMLButtonElement, MouseEvent>)
    if (e) e.preventDefault();
    if (isNestedForm) return;
    try {
      // validate values before submitting

      if (validationSchema) {
        const errorObject = await validateFormValues({ validationSchema, values });

        // set the error state
        setErrors(errorObject);

        // set form error state
        setFormState(prev => ({ ...prev, hasError: !!Object.keys(errorObject).length }));

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
            // scrollDelay: settings?.SCROLL_DELAY || formContextState?.settings.SCROLL_DELAY || 0,
          });
        }

        // no further execution
        if (errorKeysAfterValidation.length) return;
      }

      if (submitHandler) {
        // if the `submithandler` function is asyncronous we have to wait for the operation to finish
        if (isAsyncFunction(submitHandler)) {
          // set submitting status
          setFormState(prev => ({ ...prev, isSubmittingForm: true }));

          // submit handler will take the packet ready to perform submit action and a difference object between initial values set and packet ready
          await submitHandler(
            {
              currentPacket: onSubmitDataInterceptor ? onSubmitDataInterceptor(values, sandBoxObject) : values,
              differencePacket: onSubmitDataInterceptor
                ? getDifferenceObject(initial, onSubmitDataInterceptor(values, sandBoxObject))
                : getDifferenceObject(initial, values),
              initialPacket: initial,
            },
            sandBoxObject
          );
        }

        // if submit handler is not asyncronous function then
        if (!isAsyncFunction(submitHandler)) {
          // set submition status
          setFormState(prev => ({ ...prev, isSubmittingForm: true }));

          submitHandler(
            {
              currentPacket: onSubmitDataInterceptor ? onSubmitDataInterceptor(values, sandBoxObject) : values,
              differencePacket: onSubmitDataInterceptor
                ? getDifferenceObject(initial, onSubmitDataInterceptor(values, sandBoxObject))
                : getDifferenceObject(initial, values),
              initialPacket: initial,
            },
            sandBoxObject
          );
        }
      }
    } catch (error: any) {
      // set submition status
      setFormState(prev => ({ ...prev, isSubmitionError: true, submitionError: error }));
      throw new Error(`Error While Submiting Form. ${error}`);
    } finally {
      // set submitting status
      setFormState(prev => ({ ...prev, isSubmittingForm: false }));
    }
  }

  function register(controlName: string, registerParamProps?: RegisterParamProps): IRegisterOutputProps {
    // function to handle touched state
    function onTouchHandler() {
      setTouchedControls(prev => ({ ...prev, [controlName]: true }));
    }

    // to handle value change
    function onChange(event: any) {
      const isOnChangeEvent = event instanceof Event || !!event.target;
      // there is `setEnable` function or value
      if (registerParamProps && registerParamProps?.setEnable) {
        setControlEnable(prev => ({
          ...prev,
          [controlName]: registerParamProps?.setEnable
            ? typeof registerParamProps.setEnable === 'function'
              ? registerParamProps.setEnable({
                  bindValue: isOnChangeEvent ? event.target.value : event,
                  values,
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
          interceptedValues = onChangeInterceptor(
            {
              values: {
                ...values,
                [controlName]: registerParamProps?.setCustomValue
                  ? registerParamProps.setCustomValue(event.target.value, sandBoxObject)
                  : event.target.value,
              },
              touchedErrors,
              errors,
              touchedControls,
            },
            sandBoxObject
          );
        } else {
          interceptedValues = onChangeInterceptor(
            {
              values: {
                ...values,
                [controlName]: registerParamProps?.setCustomValue
                  ? registerParamProps.setCustomValue(event, sandBoxObject)
                  : event,
              },
              touchedErrors,
              errors,
              touchedControls,
            },
            sandBoxObject
          );
        }
        setValues(interceptedValues);

        // we do not continue executing after this
        return;
      }

      // if argument is an event
      if (isOnChangeEvent) {
        event.stopPropagation();
        const valuesToUpdate = {
          ...values,
          [controlName]: registerParamProps?.setCustomValue
            ? registerParamProps.setCustomValue(event.target.value, sandBoxObject)
            : event.target.value,
        };
        // update the values
        setValues(valuesToUpdate);
      } else {
        const valuesToUpdate = {
          ...values,
          [controlName]: registerParamProps?.setCustomValue
            ? registerParamProps.setCustomValue(event, sandBoxObject)
            : event,
        };
        // update the values
        setValues(valuesToUpdate);
      }

      // update the touched state if it is `true`
      if (touchOnChange) {
        onTouchHandler();
      }
    }

    // except event listeners other attributes should be in small case because they will be passed to our components as probs
    return {
      id: getControlId(formName || '', controlName),
      controlname: controlName,
      touchederror: touchedErrors[controlName] || null,
      error: errors[controlName] || null,
      haserror: !!errors[controlName],
      touched: !!touchedControls[controlName],
      value: values[controlName],
      onTouchHandler,
      onChange,
      enable: controlEnable[controlName] || true,
      controlfilling: controlFilling[controlName] || false,
    };
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    touchedErrors,
    formState,
    register,
    onSubmitHandler,
    setFormState,
    resetForm,
  };
}

export {
  useForm,
  FormProvider,
  useFormContextData,
  ISandBoxObject,
  IUseFormInputProps,
  IRegisterOutputProps,
  RegisterParamProps,
  UseFormOutputType,
  formStateType,
};
