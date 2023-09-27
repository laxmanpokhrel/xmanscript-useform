import * as React from 'react';
import formContext from '../context/formContext';
import { formStateType } from '../@types';

export default function useFormState(formName: string): formStateType {
  const formContextState = React.useContext(formContext);
  if (!formContextState) throw new Error('useForm must be used within a component wrapped with FormProvider');
  return formContextState.formData.state[formName];
}
