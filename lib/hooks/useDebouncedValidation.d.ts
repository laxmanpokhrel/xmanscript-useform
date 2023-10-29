import { Schema } from 'yup';
interface IUseDebouncedValidationProps {
    callback: (errorObject: Record<string, any>) => void;
    dependencies: any[];
    validationSchema?: Schema<any> | ((values: Record<string, unknown>) => Record<string, any>);
    values: Record<string, any>;
    debounceTime: number;
    validateOnSubmit: boolean;
}
export default function useDebouncedValidation({ callback, dependencies, validationSchema, values, debounceTime, validateOnSubmit, }: IUseDebouncedValidationProps): void;
export {};
