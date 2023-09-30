/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import FormContext from './formContext';
import { ContextValueType, UpdateFormDataProps, UpdateFormStateProps } from '../@types';
import { fromContextInitialState, singleFormInitialState } from '../constants';

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formState, setFormState] = React.useState(fromContextInitialState);

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

  // function to handle update of the form states
  function updateFormErrors({ formName, update }: UpdateFormStateProps) {
    setFormState(prev => ({
      ...prev,
      [formName]: { ...prev[formName], errors: { ...prev[formName].errors, ...update } },
    }));
  }

  // function to handle update of the form states
  function updateFormTouchedErrors({ formName, update }: UpdateFormStateProps) {
    setFormState(prev => ({
      ...prev,
      [formName]: { ...prev[formName], touchedErrors: { ...prev[formName].touchedErrors, ...update } },
    }));
  }

  // function to handle update of the form values
  function updateFormData({ formName, update }: UpdateFormDataProps) {
    setFormState(prev => ({
      ...prev,
      [formName]: { ...prev[formName], values: { ...prev[formName].values, ...update } },
    }));
  }

  // Wrap the context value object in useMemo
  const contextValue: ContextValueType = React.useMemo(() => {
    return {
      formContextData: formState,
      initializeFormToContext,
      updateFormState,
      updateFormData,
      updateFormErrors,
      updateFormTouchedErrors,
    };
  }, [formState]);

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};

export default FormProvider;
