/* eslint-disable no-unused-vars */

import { ObjectSchema, Schema } from 'yup';

export type formStateType = {
  isPreFillingForm: boolean;
  isSubmittingForm: boolean;
  submitionError: boolean;
  hasError: boolean;
  error: string | null;
};
export interface ISandBoxObject {
  setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setTouchedErrors: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setTouchedControls: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setControlEnable: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setFormState: React.Dispatch<React.SetStateAction<formStateType>>;
  setControlFilling: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  resetForm: () => void;
  parcel: any | null;
}

export interface IRegisterOutputProps {
  id: string;
  touchederror: any;
  error: any;
  haserror: boolean;
  touched: boolean;
  enable: boolean;
  value: any;
  onTouchHandler: () => void; // will just have to execute this function
  onChange: (e: any) => void;
  controlname: string;
  controlfilling: boolean;
}

type SetEnableInputProps = { bindValue: any; values: any };

export type RegisterParamProps = {
  setCustomValue?: (value: any, sandBoxObject: ISandBoxObject) => any;
  setEnable?: ((props: SetEnableInputProps) => boolean) | boolean;
};

export type formContextStateType = {
  state: formStateType;
  values: Record<string, any>;
  errors: Record<string, any>;
  touchedErrors: Record<string, any>;
  sandBoxObject?: ISandBoxObject;
};

export type UseFormOutputType = {
  bindValues: Record<string, any>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  errors: Record<string, any>;
  touchedErrors: Record<string, any>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  formState: formStateType;
  register: (controlName: string, registerParamProps?: RegisterParamProps) => IRegisterOutputProps;
  onSubmitHandler: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  setFormState: React.Dispatch<React.SetStateAction<formStateType>>;
  resetForm: () => void;
};

export type UpdateFormStateProps = { formName: string; update: Partial<formStateType> };
export type UpdateFormDataProps = { formName: string; update: Record<string, any> };
export type UpdateFormErrorsProps = { formName: string; update: Record<string, any> };
export type UpdateFormTouchedErrorsProps = { formName: string; update: Record<string, any> };
export type UpdateFormSandBoxObjectProps = { formName: string; sandBoxObject: ISandBoxObject };

export type SettingsType = {
  DEBOUNCE_TIME?: number;
  SCROLL_DELAY?: number;
  parcel?: any | null;
};

export type ContextValueType = {
  formContextData: Record<string, formContextStateType>;
  initializeFormToContext: (formName: string) => void;
  updateFormState: ({ formName, update }: UpdateFormStateProps) => void;
  updateFormValues: ({ formName, update }: UpdateFormDataProps) => void;
  updateFormErrors: ({ formName, update }: UpdateFormErrorsProps) => void;
  updateFormTouchedErrors: ({ formName, update }: UpdateFormTouchedErrorsProps) => void;
  updateFormSandBoxObject: ({ formName, sandBoxObject }: UpdateFormSandBoxObjectProps) => void;
  settings: SettingsType;
};

export type useFormContextDataOutput = Record<string, any>;

export type SubmitHandlerInputProps = {
  currentPacket: Record<string, any>;
  differencePacket: Record<string, any>;
  initialPacket: Record<string, any>;
};
export type AsyncFunction = (values: Record<string, any>) => Promise<void>;
export type SyncSubmitHandlerFunction = (props: SubmitHandlerInputProps, sandBoxObject: ISandBoxObject) => void;
export type AsyncSubmitHandlerFunction = (
  props: SubmitHandlerInputProps,
  sandBoxObject: ISandBoxObject
) => Promise<void>;
export type SyncPrefillerFunction = () => Record<string, any>;
export type AsyncPrefillerFunction = () => Promise<Record<string, any>>;

export type FormProviderPropsType = { children?: React.ReactNode; settings?: SettingsType };

// ****************************************************
// ***************** interface ************************
// ****************************************************
export interface IRegisterProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onFocus' | 'onAbort'> {
  value: any;
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

export interface IYupError {
  message: string;
  path: string;
}

export interface IUseFormInputProps {
  formName: string;
  initialValues: Record<string, any>;
  validationSchema?: ObjectSchema<any> | Schema<any> | ((values: Record<string, unknown>) => Record<string, any>);
  onChangeInterceptor?: (props: IOnChangeInterceptorInput, sandBoxObject: ISandBoxObject) => Record<string, any>;
  onSubmitDataInterceptor?: (data: Record<string, any>, sandBoxObject: ISandBoxObject) => Record<string, any>;
  isNestedForm?: boolean;
  validateOnSubmit?: boolean;
  settings?: SettingsType;
  touchOnChange?: boolean;
  submitHandler?: SyncSubmitHandlerFunction | AsyncSubmitHandlerFunction;
  scrollToErrorControl?: boolean;
  preFillerFn?: SyncPrefillerFunction | AsyncPrefillerFunction;
  controlFillers?: Record<string, (() => Promise<any>) | (() => any)>;
  parcel?: any | null;
}
