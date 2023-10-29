"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleFormInitialState = exports.fromContextInitialState = exports.defaultFormState = void 0;
// default form State
exports.defaultFormState = {
    isPreFillingForm: false,
    isSubmittingForm: false,
    isSubmitionError: false,
    isSubmitionSuccess: false,
    hasError: true,
    submitionError: null,
    hasChanges: false,
};
// current state of the form
exports.fromContextInitialState = {};
// initial state of every form
exports.singleFormInitialState = {
    state: exports.defaultFormState,
    values: {},
    errors: {},
    touchedErrors: {},
};
//# sourceMappingURL=index.js.map