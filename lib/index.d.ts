import { ISandBoxObject, IUseFormInputProps, IRegisterOutputProps, RegisterParamProps, UseFormOutputType, formStateType } from './@types';
import FormProvider from './context/FormProvider';
import useFormContextData from './hooks/useFormContextData';
declare function useForm({ formName, initialValues, validationSchema, settings, validateOnSubmit, touchOnChange, submitHandler, scrollToErrorControl, onChangeInterceptor, onSubmitDataInterceptor, isNestedForm, preFill, parcel, persistValues, }: IUseFormInputProps): UseFormOutputType;
export { useForm, FormProvider, useFormContextData, ISandBoxObject, IUseFormInputProps, IRegisterOutputProps, RegisterParamProps, UseFormOutputType, formStateType, };
