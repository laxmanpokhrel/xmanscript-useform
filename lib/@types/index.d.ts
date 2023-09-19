/// <reference types="react" />
import { Schema } from 'yup';
export interface IRegisterProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onFocus' | 'onAbort'> {
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
export interface IUseFormProps {
    initialValues: Record<string, any>;
    formName?: string | null;
    validationSchema?: Schema<any> | ((values: Record<string, unknown>) => Record<string, any>);
    onChangeDataInterceptor?: (props: IOnChangeInterceptorProps) => Record<string, any>;
    postDataInterceptor?: (data: Record<string, any>) => Record<string, any>;
    isNestedForm?: boolean;
    validateOnSubmit?: boolean;
    metaData: IMetaDataProps;
}
export interface IYupError {
    message: string;
    path: string;
}
export {};
