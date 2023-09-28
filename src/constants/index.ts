import { formContextStateType } from '../@types';

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
export const fromContextInitialState: Record<string, formContextStateType> = {};

// initial state of every form
export const singleFormInitialState: formContextStateType = {
  state: {
    isPrefilling: false,
    isSubmitting: false,
    submitionError: false,
    hasError: false,
    isValidating: false,
    isControlPrefilling: false,
  },
  values: {},
};
