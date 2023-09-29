import { IUseFormInputProps, UseFormOutputType } from './@types';
import FormProvider from './context/FormProvider';
import useFormState from './hooks/useFormState';
declare function useForm({ initialValues, validationSchema, metaData, validateOnSubmit, touchOnChange, formName, submitHandler, scrollToErrorControl, onChangeInterceptor, onSubmitDataInterceptor, isNestedForm, preFillerFn, }: IUseFormInputProps): UseFormOutputType;
export { useForm, FormProvider, useFormState };
