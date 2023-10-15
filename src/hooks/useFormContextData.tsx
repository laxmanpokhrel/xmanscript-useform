import * as React from 'react';
import formContext from '../context/formContext';
import { useFormContextDataOutput } from '../@types';

export default function useFormContextData(formName: string): useFormContextDataOutput | undefined {
  const formContextState = React.useContext(formContext);
  if (!formContextState)
    throw new Error('useFormContextData must be used within a component wrapped with FormProvider');
  return formContextState?.formContextData[formName] || {};
}
