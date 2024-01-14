"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react-hooks/exhaustive-deps */
const React = __importStar(require("react"));
const formContext_1 = __importDefault(require("./formContext"));
const constants_1 = require("../constants");
let metaData = {};
// `Map` to keep track of form names.
// Note: It could have been a simple array of string with form names in it, but we might need to add additional informations of the form in future so used `Map`
const formNameCache = new Map();
const FormProvider = (formProviderProps) => {
    const [formState, setFormState] = React.useState(constants_1.fromContextInitialState);
    // this variable is for the internal use of context only
    // function to set the meta data
    function setMetaData(key, value) {
        metaData = Object.assign(Object.assign({}, metaData), { [key]: Object.assign(Object.assign({}, metaData[key]), value) });
    }
    // function to initialize form to context
    function initializeFormToContext(formName) {
        // check if the form name already exists
        if (formNameCache.get(formName))
            throw new Error('Dublicate form name. Please add a unique form name.');
        else
            formNameCache.set(formName, {});
        setFormState(prev => (Object.assign(Object.assign({}, prev), { [formName]: constants_1.singleFormInitialState })));
    }
    // function to handle update of the form states
    function updateFormState({ formName, update }) {
        setFormState(prev => {
            var _a;
            return (Object.assign(Object.assign({}, prev), { [formName]: Object.assign(Object.assign({}, prev[formName]), { state: Object.assign(Object.assign({}, (_a = prev[formName]) === null || _a === void 0 ? void 0 : _a.state), update) }) }));
        });
    }
    // function to handle update of the form errors
    function updateFormErrors({ formName, update }) {
        setFormState(prev => {
            var _a;
            return (Object.assign(Object.assign({}, prev), { [formName]: Object.assign(Object.assign({}, prev[formName]), { errors: Object.assign(Object.assign({}, (_a = prev[formName]) === null || _a === void 0 ? void 0 : _a.errors), update) }) }));
        });
    }
    // function to handle update of the form touchedErrors
    function updateFormTouchedErrors({ formName, update }) {
        setFormState(prev => {
            var _a;
            return (Object.assign(Object.assign({}, prev), { [formName]: Object.assign(Object.assign({}, prev[formName]), { touchedErrors: Object.assign(Object.assign({}, (_a = prev[formName]) === null || _a === void 0 ? void 0 : _a.touchedErrors), update) }) }));
        });
    }
    // function to handle update of the form values
    function updateFormValues({ formName, update }) {
        setFormState(prev => {
            var _a;
            return (Object.assign(Object.assign({}, prev), { [formName]: Object.assign(Object.assign({}, prev[formName]), { values: Object.assign(Object.assign({}, (_a = prev[formName]) === null || _a === void 0 ? void 0 : _a.values), update) }) }));
        });
    }
    // function to handle update of the form values
    function setFormSandBoxObject({ formName, sandBoxObject }) {
        setFormState(prev => (Object.assign(Object.assign({}, prev), { [formName]: Object.assign(Object.assign({}, prev[formName]), { sandBoxObject }) })));
    }
    // Wrap the context value object in useMemo
    const contextValue = React.useMemo(() => {
        return {
            formContextData: formState,
            initializeFormToContext,
            updateFormState,
            updateFormValues,
            updateFormErrors,
            updateFormTouchedErrors,
            setFormSandBoxObject,
            setMetaData,
            metaData,
            settings: formProviderProps && (formProviderProps === null || formProviderProps === void 0 ? void 0 : formProviderProps.settings)
                ? formProviderProps.settings
                : { DEBOUNCE_TIME: 300, SCROLL_DELAY: 0, parcel: null },
        };
    }, [formState]);
    return (React.createElement(formContext_1.default.Provider, { value: contextValue }, formProviderProps ? formProviderProps.children : null));
};
exports.default = FormProvider;
//# sourceMappingURL=FormProvider.js.map