import { Schema } from 'yup';
type ValidateFormValuesProps = {
    validationSchema: Schema<any> | ((props: Record<string, unknown>) => Record<string, any>);
    values: Record<string, any>;
};
export default function validateFormValues({ validationSchema, values }: ValidateFormValuesProps): Record<string, any> | Promise<Record<string, any>>;
export {};
