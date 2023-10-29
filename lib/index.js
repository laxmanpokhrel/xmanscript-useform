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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormContextData = exports.FormProvider = exports.useForm = void 0;
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
const React = __importStar(require("react"));
const utils_1 = require("@xmanscript/utils");
const useDebouncedValidation_1 = __importDefault(require("./hooks/useDebouncedValidation"));
const validateValueWithYupSchema_1 = require("./utils/validateValueWithYupSchema");
const isAsyncFunction_1 = require("./utils/isAsyncFunction");
const validateFormValues_1 = __importDefault(require("./utils/validateFormValues"));
const FormProvider_1 = __importDefault(require("./context/FormProvider"));
exports.FormProvider = FormProvider_1.default;
const formContext_1 = __importDefault(require("./context/formContext"));
const constants_1 = require("./constants");
const useFormContextData_1 = __importDefault(require("./hooks/useFormContextData"));
exports.useFormContextData = useFormContextData_1.default;
const usePreventUnload_1 = __importDefault(require("./hooks/usePreventUnload"));
function useForm({ formName, initialValues, validationSchema, settings, validateOnSubmit, touchOnChange, submitHandler, scrollToErrorControl = true, onChangeInterceptor, onSubmitDataInterceptor, isNestedForm, preFill, parcel, persistValues, }) {
    const [initial, setInitial] = React.useState(initialValues);
    const [values, setValues] = React.useState(initial);
    const [errors, setErrors] = React.useState({});
    const [touchedErrors, setTouchedErrors] = React.useState({});
    const [touchedControls, setTouchedControls] = React.useState({});
    const [controlEnable, setControlEnable] = React.useState({});
    const [formState, setFormState] = React.useState(constants_1.defaultFormState);
    const [controlFilling, setControlFilling] = React.useState({});
    const formContextState = React.useContext(formContext_1.default);
    // hook to prevent form from unloading
    (0, usePreventUnload_1.default)(formName, !!(settings ? settings.preventUnload : false || (formContextState === null || formContextState === void 0 ? void 0 : formContextState.settings.preventUnload)));
    // function to reset form
    function resetForm() {
        setValues(initialValues);
        setErrors({});
        setTouchedErrors({});
        setTouchedControls({});
        formContextState === null || formContextState === void 0 ? void 0 : formContextState.initializeFormToContext(formName);
    }
    const sandBoxObject = {
        setValues,
        setErrors,
        setTouchedControls,
        setTouchedErrors,
        setControlEnable,
        setFormState,
        setControlFilling,
        resetForm,
        parcel: parcel || null,
    };
    // for persisting or initializing form values
    React.useEffect(() => {
        var _a;
        if (!formContextState)
            console.error('Persisting values works within a component wrapped with FormProvider only.');
        if (persistValues && formContextState) {
            // register form to context
            // get the form values from the context
            const valuesFromContext = ((_a = formContextState.formContextData[formName]) === null || _a === void 0 ? void 0 : _a.values) || {};
            setValues(valuesFromContext);
        }
        else {
            formContextState === null || formContextState === void 0 ? void 0 : formContextState.initializeFormToContext(formName);
        }
        // set the empty metadata of the form
        formContextState === null || formContextState === void 0 ? void 0 : formContextState.setMetaData(formName, {});
        // set the sandBox object of the form
        formContextState === null || formContextState === void 0 ? void 0 : formContextState.setFormSandBoxObject({ formName, sandBoxObject });
    }, []);
    // update the errors of the context when errors change
    React.useEffect(() => {
        if (!formContextState)
            return;
        formContextState === null || formContextState === void 0 ? void 0 : formContextState.updateFormErrors({ formName, update: errors });
    }, [errors]);
    // update the touchedErrors of the context when touchedErrors change
    React.useEffect(() => {
        if (!formContextState)
            return;
        formContextState === null || formContextState === void 0 ? void 0 : formContextState.updateFormTouchedErrors({ formName, update: touchedErrors });
    }, [touchedErrors]);
    // update the values of the context when values change
    React.useEffect(() => {
        if (!formContextState)
            return;
        formContextState === null || formContextState === void 0 ? void 0 : formContextState.updateFormValues({ formName, update: values });
        formContextState === null || formContextState === void 0 ? void 0 : formContextState.updateFormState({
            formName,
            update: { hasChanges: !!Object.keys((0, utils_1.getDifferenceObject)(initial, values)).length },
        });
    }, [values, initial]);
    // update the state of the  context when state changes
    React.useEffect(() => {
        if (!formContextState)
            return;
        formContextState === null || formContextState === void 0 ? void 0 : formContextState.updateFormState({ formName, update: formState });
    }, [formState]);
    React.useEffect(() => {
        (() => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const hasPreFiller = (preFill === null || preFill === void 0 ? void 0 : preFill.formPreFiller) != null;
            const hasControlFillers = typeof (preFill === null || preFill === void 0 ? void 0 : preFill.controlFiller) === 'object' && Object.keys(preFill === null || preFill === void 0 ? void 0 : preFill.formPreFiller).length > 0;
            // if the form is already prefilled we do not prefill it again, if donw we'll loose the previous context of the changes in the form
            if ((hasPreFiller || hasControlFillers) && !((_a = formContextState === null || formContextState === void 0 ? void 0 : formContextState.metaData[formName]) === null || _a === void 0 ? void 0 : _a.isFormPrefilled)) {
                try {
                    // Begin setting isPreFillingForm state
                    setFormState(prev => (Object.assign(Object.assign({}, prev), { isPreFillingForm: true })));
                    const { fn } = preFill.formPreFiller;
                    let preFillValues = {};
                    // run only if forPreFiller is enable
                    if (hasPreFiller && preFill.formPreFiller.enable) {
                        if ((0, isAsyncFunction_1.isAsyncFunction)(fn)) {
                            // get the prefill values asynchronously
                            preFillValues = yield fn();
                        }
                        else {
                            preFillValues = fn();
                        }
                    }
                    if (hasControlFillers) {
                        const controlFillerPromises = Object.entries(preFill.controlFiller).map(([key, value]) => __awaiter(this, void 0, void 0, function* () {
                            if (value.enable && (0, isAsyncFunction_1.isAsyncFunction)(value.fn)) {
                                // set control filling to true
                                setControlFilling(prev => (Object.assign(Object.assign({}, prev), { [key]: true })));
                                // get values from controlFillerFn asynchronously
                                const controlFillerValue = yield value.fn();
                                // set the received value
                                setValues(prev => (Object.assign(Object.assign({}, prev), { [key]: controlFillerValue })));
                                // set the initial to find the different object for submit handler
                                setInitial(prev => (Object.assign(Object.assign({}, prev), { [key]: controlFillerValue })));
                                // set control filling to false
                                setControlFilling(prev => (Object.assign(Object.assign({}, prev), { [key]: false })));
                            }
                            if (value.enable && typeof value.fn === 'function' && !(0, isAsyncFunction_1.isAsyncFunction)(value.fn)) {
                                // get values from controlFillerFn synchronously
                                const controlFillerValue = value.fn();
                                // set the received value
                                setValues(prev => (Object.assign(Object.assign({}, prev), { [key]: controlFillerValue })));
                                // set the initial to find the different object for submit handler
                                setInitial(prev => (Object.assign(Object.assign({}, prev), { [key]: controlFillerValue })));
                            }
                        }));
                        // Wait for all controlFillerPromises to complete
                        yield Promise.all(controlFillerPromises);
                    }
                    // for internal use only
                    formContextState === null || formContextState === void 0 ? void 0 : formContextState.setMetaData(formName, { isFormPrefilled: true });
                    // Update initial and values
                    setInitial(preFillValues);
                    setValues(preFillValues);
                }
                catch (error) {
                    formContextState === null || formContextState === void 0 ? void 0 : formContextState.setMetaData(formName, { isFormPrefilled: false });
                    throw new Error(`Error Occurred. ${error}`);
                }
                finally {
                    // Always set isPreFillingForm to false when done
                    setFormState(prev => (Object.assign(Object.assign({}, prev), { isPreFillingForm: false })));
                }
            }
        }))();
    }, []);
    // get the debounce time for debounce validateion
    const debounceTIme = (settings === null || settings === void 0 ? void 0 : settings.DEBOUNCE_TIME) || (formContextState === null || formContextState === void 0 ? void 0 : formContextState.settings.DEBOUNCE_TIME) || 300;
    // validate values using debounced validation
    (0, useDebouncedValidation_1.default)({
        validationSchema,
        values,
        debounceTime: debounceTIme,
        validateOnSubmit: !!validateOnSubmit,
        callback: (errorObject) => {
            // set errors for every controls
            setErrors(errorObject);
            // set form error state
            setFormState(prev => (Object.assign(Object.assign({}, prev), { hasError: !!Object.keys(errorObject).length })));
            // set error for only touched controls
            setTouchedErrors((0, utils_1.intersectObjects)(touchedControls, errorObject));
        },
        dependencies: [values, touchedControls],
    });
    function onSubmitHandler(e) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (e is React.FormEvent<HTMLFormElement> || e instanceof React.MouseEvent<HTMLButtonElement, MouseEvent>)
            if (e)
                e.preventDefault();
            if (isNestedForm)
                return;
            try {
                // validate values before submitting
                if (validationSchema) {
                    const errorObject = yield (0, validateFormValues_1.default)({ validationSchema, values });
                    // set the error state
                    setErrors(errorObject);
                    // set form error state
                    setFormState(prev => (Object.assign(Object.assign({}, prev), { hasError: !!Object.keys(errorObject).length })));
                    // also set the touched error
                    setTouchedErrors(errorObject);
                    const errorKeysAfterValidation = Object.keys(errorObject);
                    // set all touched controls to true
                    const touchedStateObject = errorKeysAfterValidation === null || errorKeysAfterValidation === void 0 ? void 0 : errorKeysAfterValidation.reduce((obj, item) => (Object.assign(Object.assign({}, obj), { [item]: true })), {});
                    // set the state of touched control with touchedObject
                    setTouchedControls(prev => (Object.assign(Object.assign({}, prev), touchedStateObject)));
                    // if `scrollToErrorControl` is true and has error then we scroll to the first control with error
                    if (scrollToErrorControl && Object.keys(errorObject).length) {
                        (0, utils_1.scrollToComponent)({
                            componentId: (0, validateValueWithYupSchema_1.getControlId)(formName, errorObject[Object.keys(errorObject)[0]]),
                            focusAfterScroll: true,
                            // scrollDelay: settings?.SCROLL_DELAY || formContextState?.settings.SCROLL_DELAY || 0,
                        });
                    }
                    // no further execution
                    if (errorKeysAfterValidation.length)
                        return;
                }
                if (submitHandler) {
                    // if the `submithandler` function is asyncronous we have to wait for the operation to finish
                    if ((0, isAsyncFunction_1.isAsyncFunction)(submitHandler)) {
                        // set submitting status
                        setFormState(prev => (Object.assign(Object.assign({}, prev), { isSubmittingForm: true })));
                        // submit handler will take the packet ready to perform submit action and a difference object between initial values set and packet ready
                        yield submitHandler({
                            currentPacket: onSubmitDataInterceptor ? onSubmitDataInterceptor(values, sandBoxObject) : values,
                            differencePacket: onSubmitDataInterceptor
                                ? (0, utils_1.getDifferenceObject)(initial, onSubmitDataInterceptor(values, sandBoxObject))
                                : (0, utils_1.getDifferenceObject)(initial, values),
                            initialPacket: initial,
                        }, sandBoxObject);
                    }
                    // if submit handler is not asyncronous function then
                    if (!(0, isAsyncFunction_1.isAsyncFunction)(submitHandler)) {
                        // set submition status
                        setFormState(prev => (Object.assign(Object.assign({}, prev), { isSubmittingForm: true })));
                        submitHandler({
                            currentPacket: onSubmitDataInterceptor ? onSubmitDataInterceptor(values, sandBoxObject) : values,
                            differencePacket: onSubmitDataInterceptor
                                ? (0, utils_1.getDifferenceObject)(initial, onSubmitDataInterceptor(values, sandBoxObject))
                                : (0, utils_1.getDifferenceObject)(initial, values),
                            initialPacket: initial,
                        }, sandBoxObject);
                    }
                    // form submission success
                    setFormState(prev => (Object.assign(Object.assign({}, prev), { isSubmitionSuccess: true })));
                }
            }
            catch (error) {
                // set submition status
                setFormState(prev => (Object.assign(Object.assign({}, prev), { isSubmitionError: true, isSubmitionSuccess: false, submitionError: error })));
                throw new Error(`Error While Submiting Form. ${error}`);
            }
            finally {
                // set submitting status
                setFormState(prev => (Object.assign(Object.assign({}, prev), { isSubmittingForm: false })));
            }
        });
    }
    function register(controlName, registerParamProps) {
        // function to handle touched state
        function onTouchHandler() {
            setTouchedControls(prev => (Object.assign(Object.assign({}, prev), { [controlName]: true })));
        }
        // to handle value change
        function onChange(event) {
            const isOnChangeEvent = event instanceof Event || !!event.target;
            // there is `setEnable` function or value
            if (registerParamProps && (registerParamProps === null || registerParamProps === void 0 ? void 0 : registerParamProps.setEnable)) {
                setControlEnable(prev => (Object.assign(Object.assign({}, prev), { [controlName]: (registerParamProps === null || registerParamProps === void 0 ? void 0 : registerParamProps.setEnable)
                        ? typeof registerParamProps.setEnable === 'function'
                            ? registerParamProps.setEnable({
                                bindValue: isOnChangeEvent ? event.target.value : event,
                                values,
                            })
                            : typeof registerParamProps.setEnable === 'boolean'
                                ? registerParamProps.setEnable
                                : true
                        : true })));
            }
            // if onChangeInterceptor is applied then we transfer the flow to the interceptor and set the values returned by the interceptor to the form values
            if (onChangeInterceptor) {
                let interceptedValues = {};
                if (isOnChangeEvent) {
                    interceptedValues = onChangeInterceptor({
                        values: Object.assign(Object.assign({}, values), { [controlName]: (registerParamProps === null || registerParamProps === void 0 ? void 0 : registerParamProps.setCustomValue)
                                ? registerParamProps.setCustomValue(event.target.value, sandBoxObject)
                                : event.target.value }),
                        touchedErrors,
                        errors,
                        touchedControls,
                    }, sandBoxObject);
                }
                else {
                    interceptedValues = onChangeInterceptor({
                        values: Object.assign(Object.assign({}, values), { [controlName]: (registerParamProps === null || registerParamProps === void 0 ? void 0 : registerParamProps.setCustomValue)
                                ? registerParamProps.setCustomValue(event, sandBoxObject)
                                : event }),
                        touchedErrors,
                        errors,
                        touchedControls,
                    }, sandBoxObject);
                }
                setValues(interceptedValues);
                // we do not continue executing after this
                return;
            }
            // if argument is an event
            if (isOnChangeEvent) {
                event.stopPropagation();
                const valuesToUpdate = Object.assign(Object.assign({}, values), { [controlName]: (registerParamProps === null || registerParamProps === void 0 ? void 0 : registerParamProps.setCustomValue)
                        ? registerParamProps.setCustomValue(event.target.value, sandBoxObject)
                        : event.target.value });
                // update the values
                setValues(valuesToUpdate);
            }
            else {
                const valuesToUpdate = Object.assign(Object.assign({}, values), { [controlName]: (registerParamProps === null || registerParamProps === void 0 ? void 0 : registerParamProps.setCustomValue)
                        ? registerParamProps.setCustomValue(event, sandBoxObject)
                        : event });
                // update the values
                setValues(valuesToUpdate);
            }
            // update the touched state if it is `true`
            if (touchOnChange) {
                onTouchHandler();
            }
        }
        // except event listeners other attributes should be in small case because they will be passed to our components as probs
        return {
            id: (0, validateValueWithYupSchema_1.getControlId)(formName || '', controlName),
            controlname: controlName,
            touchederror: touchedErrors[controlName] || null,
            error: errors[controlName] || null,
            haserror: !!errors[controlName],
            touched: !!touchedControls[controlName],
            value: values[controlName],
            onTouchHandler,
            onChange,
            enable: controlEnable[controlName] || true,
            controlfilling: controlFilling[controlName] || false,
        };
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        touchedErrors,
        formState,
        register,
        onSubmitHandler,
        setFormState,
        resetForm,
    };
}
exports.useForm = useForm;
//# sourceMappingURL=index.js.map