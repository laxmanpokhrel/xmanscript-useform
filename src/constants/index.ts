import { formContextStateType, formStateType } from '../@types';

// default form State
export const defaultFormState: formStateType = {
  isPreFillingForm: false,
  isSubmitting: false,
  submitionError: false,
  hasError: false,
  isValidating: false,
  isControlFilling: false,
};

// current state of the form
export const fromContextInitialState: Record<string, formContextStateType> = {};

// initial state of every form
export const singleFormInitialState: formContextStateType = {
  state: {
    isPreFillingForm: false,
    isSubmitting: false,
    submitionError: false,
    hasError: false,
    isValidating: false,
    isControlFilling: false,
  },
  values: {},
};
