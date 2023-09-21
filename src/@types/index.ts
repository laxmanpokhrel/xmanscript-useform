/* eslint-disable no-unused-vars */

import { Schema } from 'yup';

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

export interface IOnChangeInterceptorProps {
  currentValues: Record<string, any>;
  currentTouchedControls: Record<string, boolean>;
  errors: Record<string, any>;
}

interface IMetaDataProps {
  DEBOUNCE_TIME: number;
}

export type SyncFunction = (values: Record<string, any>) => void;
export type AsyncFunction = (values: Record<string, any>) => Promise<void>;

export interface IUseFormInputProps {
  initialValues: Record<string, any>;
  formName?: string;
  validationSchema?: Schema<any> | ((values: Record<string, unknown>) => Record<string, any>);
  onChangeDataInterceptor?: (props: IOnChangeInterceptorProps) => Record<string, any>;
  postDataInterceptor?: (data: Record<string, any>) => Record<string, any>;
  isNestedForm?: boolean;
  validateOnSubmit?: boolean;
  metaData?: IMetaDataProps;
  touchOnChange?: boolean;
  submitHandler?: SyncFunction | AsyncFunction;
  scrollToErrorControl?: boolean;
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
