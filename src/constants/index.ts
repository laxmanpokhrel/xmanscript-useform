import { formStateType } from '../@types';

// default form State
export const defaultFormState = {
  isPrefilling: false,
  isSubmitting: false,
  submitionError: false,
  hasError: false,
  isValidating: false,
  isControlPrefilling: false,
};

// current state of the form
export const state: Record<string, formStateType> = {};

// initial state of every form
export const initialFormState: formStateType = {
  isPrefilling: false,
  isSubmitting: false,
  submitionError: false,
  hasError: false,
  isValidating: false,
  isControlPrefilling: false,
};
