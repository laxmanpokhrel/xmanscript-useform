/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import FormContext from './formContext';
import {
  ContextValueType,
  FormProviderPropsType,
  UpdateFormDataProps,
  UpdateFormSandBoxObjectProps,
  UpdateFormStateProps,
} from '../@types';
import { fromContextInitialState, singleFormInitialState } from '../constants';

const FormProvider = (formProviderProps?: FormProviderPropsType) => {
  const [formState, setFormState] = React.useState(fromContextInitialState);
  const [metaData, setMetaData] = React.useState<Record<string, any>>({});
  // this variable is for the internal use of context only
  // function to set the meta data

  // function to initialize form to context
  function initializeFormToContext(formName: string) {
    setFormState(prev => ({ ...prev, [formName]: singleFormInitialState }));
  }

  // function to handle update of the form states
  function updateFormState({ formName, update }: UpdateFormStateProps) {
    setFormState(prev => ({
      ...prev,
      [formName]: { ...prev[formName], state: { ...prev[formName].state, ...update } },
    }));
  }

  // function to handle update of the form errors
  function updateFormErrors({ formName, update }: UpdateFormStateProps) {
    setFormState(prev => ({
      ...prev,
      [formName]: { ...prev[formName], errors: { ...prev[formName].errors, ...update } },
    }));
  }

  // function to handle update of the form touchedErrors
  function updateFormTouchedErrors({ formName, update }: UpdateFormStateProps) {
    setFormState(prev => ({
      ...prev,
      [formName]: { ...prev[formName], touchedErrors: { ...prev[formName].touchedErrors, ...update } },
    }));
  }

  // function to handle update of the form values
  function updateFormValues({ formName, update }: UpdateFormDataProps) {
    setFormState(prev => ({
      ...prev,
      [formName]: { ...prev[formName], values: { ...prev[formName].values, ...update } },
    }));
  }

  // function to handle update of the form values
  function setFormSandBoxObject({ formName, sandBoxObject }: UpdateFormSandBoxObjectProps) {
    setFormState(prev => ({
      ...prev,
      [formName]: { ...prev[formName], sandBoxObject },
    }));
  }

  // Wrap the context value object in useMemo
  const contextValue: ContextValueType = React.useMemo(() => {
    return {
      formContextData: formState,
      initializeFormToContext,
      updateFormState,
      updateFormValues,
      updateFormErrors,
      updateFormTouchedErrors,
      setFormSandBoxObject,
      setMetaData,
      metaData,
      settings:
        formProviderProps && formProviderProps?.settings
          ? formProviderProps.settings
          : { DEBOUNCE_TIME: 300, SCROLL_DELAY: 0, parcel: null },
    };
  }, [formState]);

  return (
    <FormContext.Provider value={contextValue}>
      {formProviderProps ? formProviderProps.children : null}
    </FormContext.Provider>
  );
};

export default FormProvider;
