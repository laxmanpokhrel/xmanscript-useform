"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getControlId = exports.validateValueWithYupSchema = void 0;
const utils_1 = require("@xmanscript/utils");
// Function to validate values with a Yup validation schema
function validateValueWithYupSchema(validationSchema, values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate the provided values against the Yup validation schema,
            // allowing multiple validation errors (abortEarly: false)
            if (typeof values === 'object' && validationSchema)
                yield validationSchema.validateSync(values, { abortEarly: false });
            // If validation succeeds, return an empty object (no errors)
            return {};
        }
        catch (err) {
            const tempError = {};
            // Check if there are multiple validation errors
            if (Array.isArray(err.inner)) {
                err.inner.forEach(({ path, message }) => {
                    // Store each error message in the tempError object, using the field path as the key
                    tempError[path] = message;
                });
            }
            else {
                // If there is a generic validation error, set a default error message
                tempError.error = 'Error Validating form.';
            }
            // Convert nested keys in the error object to a flat structure
            const convertedErrorObject = (0, utils_1.convertNestedKeysToObject)(tempError);
            return convertedErrorObject;
        }
    });
}
exports.validateValueWithYupSchema = validateValueWithYupSchema;
function getControlId(formName, controlName) {
    return `-${formName}-form-field-${controlName}`;
}
exports.getControlId = getControlId;
//# sourceMappingURL=validateValueWithYupSchema.js.map