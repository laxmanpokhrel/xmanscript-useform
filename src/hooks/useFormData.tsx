import * as React from 'react';
import formContext from '../context/formContext';
import { useFormDataOutput } from '../@types';

export default function useFormData(formName: string): useFormDataOutput | undefined {
  const formContextState = React.useContext(formContext);
  if (!formContextState) throw new Error('useForm must be used within a component wrapped with FormProvider');
  return formContextState?.formContextData[formName]?.values || {};
}
