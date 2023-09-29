'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.singleFormInitialState = exports.fromContextInitialState = exports.defaultFormState = void 0;
// default form State
exports.defaultFormState = {
  isPreFilling: false,
  isSubmitting: false,
  submitionError: false,
  hasError: false,
  isValidating: false,
  isControlPreFilling: false,
};
// current state of the form
exports.fromContextInitialState = {};
// initial state of every form
exports.singleFormInitialState = {
  state: {
    isPreFilling: false,
    isSubmitting: false,
    submitionError: false,
    hasError: false,
    isValidating: false,
    isControlPreFilling: false,
  },
  values: {},
};
//# sourceMappingURL=index.js.map
