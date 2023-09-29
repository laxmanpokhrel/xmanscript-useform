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
const FormProvider = ({ children }) => {
    const [formState, setFormState] = React.useState(constants_1.fromContextInitialState);
    // function to add form to context
    function registerFormToContext(formName) {
        setFormState(prev => (Object.assign(Object.assign({}, prev), { [formName]: constants_1.singleFormInitialState })));
    }
    // function to handle update of the form states
    function updateFormState({ formName, update }) {
        setFormState(prev => (Object.assign(Object.assign({}, prev), { [formName]: Object.assign(Object.assign({}, prev[formName]), { state: Object.assign(Object.assign({}, prev[formName].state), update) }) })));
    }
    // function to handle update of the form values
    function updateFormData({ formName, update }) {
        setFormState(prev => (Object.assign(Object.assign({}, prev), { [formName]: Object.assign(Object.assign({}, prev[formName]), { values: Object.assign(Object.assign({}, prev[formName].values), update) }) })));
    }
    // Wrap the context value object in useMemo
    const contextValue = React.useMemo(() => {
        return {
            formContextData: formState,
            registerFormToContext,
            updateFormState,
            updateFormData,
        };
    }, [formState]);
    return React.createElement(formContext_1.default.Provider, { value: contextValue }, children);
};
exports.default = FormProvider;
//# sourceMappingURL=FormProvider.js.map