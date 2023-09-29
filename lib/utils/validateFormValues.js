"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateValueWithYupSchema_1 = require("./validateValueWithYupSchema");
function validateFormValues({ validationSchema, values }) {
    // for yup validation schema
    if (typeof validationSchema === 'object') {
        return (0, validateValueWithYupSchema_1.validateValueWithYupSchema)(validationSchema, values);
    }
    // for validation function
    if (typeof validationSchema === 'function') {
        return validationSchema(values);
    }
    return {};
}
exports.default = validateFormValues;
//# sourceMappingURL=validateFormValues.js.map