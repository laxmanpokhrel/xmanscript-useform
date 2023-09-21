import { convertNestedKeysToObject } from '@xmanscript/utils';
import { Schema } from 'yup';
import { IYupError } from '../@types';

// Function to validate values with a Yup validation schema
export async function validateValueWithYupSchema(
  validationSchema: Schema<any>,
  values: Record<string, any>
): Promise<Record<string, any>> {
  try {
    // Validate the provided values against the Yup validation schema,
    // allowing multiple validation errors (abortEarly: false)
    if (typeof values === 'object' && validationSchema)
      await validationSchema.validateSync(values, { abortEarly: false });

    // If validation succeeds, return an empty object (no errors)
    return {};
  } catch (err: any) {
    const tempError: Record<string, any> = {};
    // Check if there are multiple validation errors
    if (Array.isArray(err.inner)) {
      err.inner.forEach(({ path, message }: IYupError) => {
        // Store each error message in the tempError object, using the field path as the key
        tempError[path] = message;
      });
    } else {
      // If there is a generic validation error, set a default error message
      tempError.error = 'Error Validating form.';
    }
    // Convert nested keys in the error object to a flat structure
    const convertedErrorObject: Record<string, any> = convertNestedKeysToObject(tempError);
    return convertedErrorObject;
  }
}

export function getControlId(formName: string, controlName: string) {
  return `-${formName}-form-field-${controlName}`;
}
