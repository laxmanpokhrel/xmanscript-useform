/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import FormContext from './formContext';
import { ContextValueType, UpdateFormStateProps } from '../@types';
import { initialFormState, state } from '../constants';

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formState, setFormState] = React.useState(state);

  // function to add form to context
  function registerFormToContext(formName: string) {
    setFormState(prev => ({ ...prev, [formName]: initialFormState }));
  }

  // function to handle update of the form state
  function updateFormState({ formName, update }: UpdateFormStateProps) {
    setFormState(prev => ({ ...prev, [formName]: { ...prev[formName], ...update } }));
  }

  // Wrap the context value object in useMemo
  const contextValue: ContextValueType = React.useMemo(() => {
    return { formData: { state: formState, data: {} }, registerFormToContext, updateFormState };
  }, [formState]);

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};

export default FormProvider;
