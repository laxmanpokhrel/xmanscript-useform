import { Schema } from 'yup';
export declare function validateValueWithYupSchema(validationSchema: Schema<any>, values: Record<string, any>): Promise<Record<string, any>>;
export declare function getControlId(formName: string, controlName: string): string;
