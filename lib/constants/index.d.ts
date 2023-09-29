import { formContextStateType } from '../@types';
export declare const defaultFormState: {
  isPreFilling: boolean;
  isSubmitting: boolean;
  submitionError: boolean;
  hasError: boolean;
  isValidating: boolean;
  isControlPreFilling: boolean;
};
export declare const fromContextInitialState: Record<string, formContextStateType>;
export declare const singleFormInitialState: formContextStateType;
