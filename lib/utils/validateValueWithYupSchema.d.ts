import { Schema } from 'yup';
declare function validateValueWithYupSchema(validationSchema: Schema<any>, values: Record<string, any>): Promise<Record<string, any>>;
declare function getControlId(formName: string, controlName: string): string;
export { validateValueWithYupSchema, getControlId };
