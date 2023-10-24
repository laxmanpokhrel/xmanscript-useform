import { formContextStateType, formStateType } from '../@types';

// default form State
export const defaultFormState: formStateType = {
  isPreFillingForm: false,
  isSubmittingForm: false,
  isSubmitionError: false,
  isSubmitionSuccess: false,
  hasError: true,
  submitionError: null,
  hasChanges: false,
};

// current state of the form
export const fromContextInitialState: Record<string, formContextStateType> = {};

// initial state of every form
export const singleFormInitialState: formContextStateType = {
  state: defaultFormState,
  values: {},
  errors: {},
  touchedErrors: {},
};
