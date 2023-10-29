import { ValidateFormValuesProps } from '../@types';
export default function validateFormValues({ validationSchema, values }: ValidateFormValuesProps): Record<string, any> | Promise<Record<string, any>>;
