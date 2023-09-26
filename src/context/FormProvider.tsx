/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import FormContext from './formContext';
import { ContextValueType, UpdateFormStateProps, formStateType } from '../@types';

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  // initial state of every form
  const initialFormState: formStateType = React.useMemo(
    () => ({
      isPrefilling: false,
      isSubmitting: false,
      submitionError: false,
      hasError: false,
      isValidating: false,
      isControlPrefilling: false,
    }),
    []
  );

  // current state of the form
  const state: Record<string, formStateType> = React.useMemo(() => ({}), []);
  const [formState, setFormState] = React.useState(state);
  // function to add form to context
  function registerFormToContext(formName: string) {
    setFormState(prev => ({ ...prev, [formName]: initialFormState }));
  }
  function updateFormState({ formName, update }: UpdateFormStateProps) {
    setFormState(prev => ({ ...prev, [formName]: { ...prev[formName], ...update } }));
  }

  // Wrap the context value object in useMemo
  const contextValue: ContextValueType = React.useMemo(() => {
    return { formState, registerFormToContext, updateFormState };
  }, [formState]);

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};

export default FormProvider;
