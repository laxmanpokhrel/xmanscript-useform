import * as React from 'react';
import { IUseFormProps } from './@types';
export default function useForm({ initialValues, validationSchema, metaData, validateOnSubmit }?: IUseFormProps): {
    bindValues: Record<string, any>;
    setBindValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    errors: Record<string, any>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    touched: Record<string, boolean>;
    formState: Record<string, any>;
    register: () => {};
    handleSubmit: () => void;
};
