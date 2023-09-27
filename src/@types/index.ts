/* eslint-disable no-unused-vars */

import { Schema } from 'yup';

// ****************************************************
// ***************** interface ************************
// ****************************************************
export interface IRegisterProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onFocus' | 'onAbort'> {
  bindvalue: any;
  onFocus: (e?: any) => void;
  onChange: (e: any) => void;
  touched: boolean;
  error: string;
  pretoucherror: any;
  controlleddisabled: boolean | undefined;
  uniquename: string;
}

export interface IOnChangeInterceptorInput {
  values: Record<string, any>;
  touchedControls: Record<string, boolean>;
  errors: Record<string, any>;
  touchedErrors: Record<string, any>;
}

interface IMetaDataProps {
  DEBOUNCE_TIME: number;
}
export type SubmitHandlerInputProps = { package: Record<string, any>; differencePackage: Record<string, any> };

export type AsyncFunction = (values: Record<string, any>) => Promise<void>;
export type SyncSubmitHandlerFunction = (props: SubmitHandlerInputProps) => void;
export type AsyncSubmitHandlerFunction = (props: SubmitHandlerInputProps) => Promise<void>;
export type SyncPrefillerFunction = () => Record<string, any>;
export type AsyncPrefillerFunction = () => Promise<Record<string, any>>;

export interface IUseFormInputProps {
  formName: string;
  initialValues: Record<string, any>;
  validationSchema?: Schema<any> | ((values: Record<string, unknown>) => Record<string, any>);
  onChangeInterceptor?: (props: IOnChangeInterceptorInput) => Record<string, any>;
  onSubmitDataInterceptor?: (data: Record<string, any>) => Record<string, any>;
  isNestedForm?: boolean;
  validateOnSubmit?: boolean;
  metaData?: IMetaDataProps;
  touchOnChange?: boolean;
  submitHandler?: SyncSubmitHandlerFunction | AsyncSubmitHandlerFunction;
  scrollToErrorControl?: boolean;
  preFillerFn?: SyncPrefillerFunction | AsyncPrefillerFunction;
}

export interface IYupError {
  message: string;
  path: string;
}

export interface IRegisterPropType {
  setCustomValue?: (e: any) => void;
  required?: boolean;
  disableFunc?: (data: Record<string, any>) => boolean;
}

// ************************************************
// ***************** types ************************
// ************************************************

export type RegisterOutputType = {
  id: string;
  touchedError: any;
  error: any;
  hasError: boolean;
  touched: boolean;
  enable: boolean;
  bindValue: any;
  onTouchHandler: () => void; // controls will just have to execute this function
  onChangeHandler: (e: any) => void; // controls will just have to execute this function
  controlName: string;
  controlFilling: boolean;
};

type SetEnableInputProps = { bindValue: any; bindvalues: any };
export type RegisterParamProps = {
  setCustomValue: (value: any) => Record<string, any>;
  setEnable?: ((props: SetEnableInputProps) => boolean) | boolean;
  controlFillerFn?: (() => Promise<any>) | (() => any);
};

export type formStateType = {
  isPrefilling: boolean;
  isSubmitting: boolean;
  submitionError: boolean;
  hasError: boolean;
  isValidating: boolean;
  isControlPrefilling: boolean;
};

export type UseFormOutputType = {
  bindValues: Record<string, any>;
  setBindValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  errors: Record<string, any>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  formState: formStateType;
  register: (controlName: string, registerParamProps?: RegisterParamProps) => RegisterOutputType;
  onSubmitHandler: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  setFormState: React.Dispatch<React.SetStateAction<formStateType>>;
};

// export type UpdateFormStateProps = { formName: string; update: Record<keyof Partial<formStateType>, boolean> };
export type UpdateFormStateProps = { formName: string; update: Partial<formStateType> };

export type ContextValueType = {
  formData: { state: Record<string, formStateType>; data: Record<string, any> };
  registerFormToContext: (formName: string) => void;
  updateFormState: ({ formName, update }: UpdateFormStateProps) => void;
};
