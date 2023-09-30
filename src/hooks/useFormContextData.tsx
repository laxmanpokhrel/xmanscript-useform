import * as React from 'react';
import formContext from '../context/formContext';
import { useFormDataOutput } from '../@types';

export default function useFormContextData(formName: string): useFormDataOutput | undefined {
  const formContextState = React.useContext(formContext);
  if (!formContextState)
    throw new Error('useFormContextData must be used within a component wrapped with FormProvider');
  return formContextState?.formContextData[formName] || {};
}
