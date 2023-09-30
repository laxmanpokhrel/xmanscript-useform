/* eslint-disable no-unused-vars */

import { ObjectSchema, Schema } from 'yup';

export type formStateType = {
  isPreFillingForm: boolean;
  isSubmitting: boolean;
  submitionError: boolean;
  hasError: boolean;
  isValidating: boolean;
  isControlFilling: boolean;
};
export interface ISandBoxObject {
  setBindValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setTouchedErrors: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setTouchedControls: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setControlEnable: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setFormState: React.Dispatch<React.SetStateAction<formStateType>>;
  setControlFilling: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  resetForm: () => void;
  parcel: any;
}

export type RegisterOutputType = {
  id: string;
  touchederror: any;
  error: any;
  haserror: boolean;
  touched: boolean;
  enable: boolean;
  bindvalue: any;
  value: any;
  onTouchHandler: () => void; // will just have to execute this function
  onChangeHandler: (e: any) => void; //  will just have to execute this function
  onChange: (e: any) => void; // controls will just have to execute this function
  controlname: string;
  controlFilling: boolean;
};

type SetEnableInputProps = { bindValue: any; bindvalues: any };

export type RegisterParamProps = {
  setCustomValue?: (value: any, sandBoxObject: ISandBoxObject) => any;
  setEnable?: ((props: SetEnableInputProps) => boolean) | boolean;
  controlFillerFn?: (() => Promise<any>) | (() => any);
};

export type formContextStateType = {
  state: formStateType;
  values: Record<string, any>;
};

export type UseFormOutputType = {
  bindValues: Record<string, any>;
  setBindValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  errors: Record<string, any>;
  touchedErrors: Record<string, any>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  formState: formStateType;
  register: (controlName: string, registerParamProps?: RegisterParamProps) => RegisterOutputType;
  onSubmitHandler: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  setFormState: React.Dispatch<React.SetStateAction<formStateType>>;
  resetForm: () => void;
};

export type UpdateFormStateProps = { formName: string; update: Partial<formStateType> };
export type UpdateFormDataProps = { formName: string; update: Record<string, any> };

export type ContextValueType = {
  formContextData: Record<string, formContextStateType>;
  initializeFormToContext: (formName: string) => void;
  updateFormState: ({ formName, update }: UpdateFormStateProps) => void;
  updateFormData: ({ formName, update }: UpdateFormDataProps) => void;
};

export type useFormDataOutput = Record<string, any>;

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

export interface IYupError {
  message: string;
  path: string;
}

export interface IRegisterPropType {
  setCustomValue?: (e: any) => void;
  required?: boolean;
  disableFunc?: (data: Record<string, any>) => boolean;
}

export interface IUseFormInputProps {
  formName: string;
  initialValues: Record<string, any>;
  validationSchema?: ObjectSchema<any> | Schema<any> | ((values: Record<string, unknown>) => Record<string, any>);
  onChangeInterceptor?: (props: IOnChangeInterceptorInput, sandBoxObject: ISandBoxObject) => Record<string, any>;
  onSubmitDataInterceptor?: (data: Record<string, any>, sandBoxObject: ISandBoxObject) => Record<string, any>;
  isNestedForm?: boolean;
  validateOnSubmit?: boolean;
  metaData?: IMetaDataProps;
  touchOnChange?: boolean;
  submitHandler?: SyncSubmitHandlerFunction | AsyncSubmitHandlerFunction;
  scrollToErrorControl?: boolean;
  preFillerFn?: SyncPrefillerFunction | AsyncPrefillerFunction;
  controlFillers?: Record<string, (() => Promise<any>) | (() => any)>;
  parcel: any;
}
