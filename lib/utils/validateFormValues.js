"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const validateValueWithYupSchema_1 = require("./validateValueWithYupSchema");
const isAsyncFunction_1 = require("./isAsyncFunction");
function validateFormValues({ validationSchema, values }) {
    // for yup validation schema
    if (typeof validationSchema === 'object') {
        return (0, validateValueWithYupSchema_1.validateValueWithYupSchema)(validationSchema, values);
    }
    // for validation function
    if (typeof validationSchema === 'function' && (0, isAsyncFunction_1.isAsyncFunction)(validationSchema)) {
        return validationSchema(values, validateValueWithYupSchema_1.validateValueWithYupSchema);
    }
    if (typeof validationSchema === 'function' && !(0, isAsyncFunction_1.isAsyncFunction)(validationSchema)) {
        return validationSchema(values);
    }
    return {};
}
exports.default = validateFormValues;
//# sourceMappingURL=validateFormValues.js.map