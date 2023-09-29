'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.useFormState = exports.FormProvider = exports.useForm = void 0;
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
const React = __importStar(require('react'));
const utils_1 = require('@xmanscript/utils');
const useDebouncedValidation_1 = __importDefault(require('./hooks/useDebouncedValidation'));
const validateValueWithYupSchema_1 = require('./utils/validateValueWithYupSchema');
const isAsyncFunction_1 = require('./utils/isAsyncFunction');
const validateFormValues_1 = __importDefault(require('./utils/validateFormValues'));
const FormProvider_1 = __importDefault(require('./context/FormProvider'));
exports.FormProvider = FormProvider_1.default;
const formContext_1 = __importDefault(require('./context/formContext'));
const constants_1 = require('./constants');
const useFormState_1 = __importDefault(require('./hooks/useFormState'));
exports.useFormState = useFormState_1.default;
function useForm({
  initialValues,
  validationSchema,
  metaData,
  validateOnSubmit,
  touchOnChange,
  formName,
  submitHandler,
  scrollToErrorControl = true,
  onChangeInterceptor,
  onSubmitDataInterceptor,
  isNestedForm,
  preFillerFn,
}) {
  const [initial, setInitial] = React.useState(initialValues);
  const [values, setValues] = React.useState(initial);
  const [errors, setErrors] = React.useState({});
  const [touchedErrors, setTouchedErrors] = React.useState({});
  const [touchedControls, setTouchedControls] = React.useState({});
  const [controlEnable, setControlEnable] = React.useState({});
  const [formState, setFormState] = React.useState(constants_1.defaultFormState);
  const [controlfilling, setControlfilling] = React.useState({});
  const formContextState = React.useContext(formContext_1.default);
  React.useEffect(() => {
    // if not wrapped with FormProvider then throw error
    // if (!formContextState) throw new Error('useForm must be used within a component wrapped with FormProvider');
    // register form to context
    formContextState === null || formContextState === void 0
      ? void 0
      : formContextState.registerFormToContext(formName);
  }, []);
  // handle prefilling of the form
  React.useEffect(() => {
    (() =>
      __awaiter(this, void 0, void 0, function* () {
        if (preFillerFn) {
          try {
            let preFillValues = {};
            if ((0, isAsyncFunction_1.isAsyncFunction)(preFillerFn)) {
              // set prefilling state
              setFormState(prev => Object.assign(Object.assign({}, prev), { isPreFilling: true }));
              // update state to context as well
              formContextState === null || formContextState === void 0
                ? void 0
                : formContextState.updateFormState({ formName, update: { isPreFilling: true } });
              // get the prefill values
              preFillValues = yield preFillerFn();
              // set prefilling state
              setFormState(prev => Object.assign(Object.assign({}, prev), { isPreFilling: false }));
              // update to context as well
              formContextState === null || formContextState === void 0
                ? void 0
                : formContextState.updateFormState({ formName, update: { isPreFilling: false } });
            }
            if (!(0, isAsyncFunction_1.isAsyncFunction)(preFillerFn)) {
              preFillValues = preFillerFn();
            }
            // set initialValueCache
            setInitial(preFillValues);
            setValues(preFillValues);
          } catch (error) {
            throw new Error(`Error Occured At Prefiller. ${error}`);
          }
        }
      }))();
  }, []);
  // validate for no validateOnSubmit
  if (!validateOnSubmit) {
    // validate values using debounced validation
    (0, useDebouncedValidation_1.default)({
      validationSchema,
      values,
      debounceTime: (metaData === null || metaData === void 0 ? void 0 : metaData.DEBOUNCE_TIME)
        ? metaData.DEBOUNCE_TIME
        : 300,
      dependencies: [values, touchedControls],
      callback: errorObject => {
        // set errors for every controls
        setErrors(errorObject);
        // set form error state
        setFormState(prev => Object.assign(Object.assign({}, prev), { hasError: !!Object.keys(errorObject).length }));
        // update to context as well
        formContextState === null || formContextState === void 0
          ? void 0
          : formContextState.updateFormState({ formName, update: { hasError: !!Object.keys(errorObject).length } });
        // set error for only touched controls
        setTouchedErrors((0, utils_1.intersectObjects)(touchedControls, errorObject));
      },
    });
  }
  function onSubmitHandler(e) {
    return __awaiter(this, void 0, void 0, function* () {
      e.preventDefault();
      if (isNestedForm) return;
      try {
        // validate values before submitting
        if (validationSchema) {
          const errorObject = yield (0, validateFormValues_1.default)({ validationSchema, values });
          // set the error state
          setErrors(errorObject);
          // set form error state
          setFormState(prev => Object.assign(Object.assign({}, prev), { hasError: !!Object.keys(errorObject).length }));
          // update to context as well
          formContextState === null || formContextState === void 0
            ? void 0
            : formContextState.updateFormState({ formName, update: { hasError: !!Object.keys(errorObject).length } });
          // also set the touched error
          setTouchedErrors(errorObject);
          const errorKeysAfterValidation = Object.keys(errorObject);
          // set all touched controls to true
          const touchedStateObject =
            errorKeysAfterValidation === null || errorKeysAfterValidation === void 0
              ? void 0
              : errorKeysAfterValidation.reduce(
                  (obj, item) => Object.assign(Object.assign({}, obj), { [item]: true }),
                  {}
                );
          // set the state of touched control with touchedObject
          setTouchedControls(prev => Object.assign(Object.assign({}, prev), touchedStateObject));
          // if `scrollToErrorControl` is true and has error then we scroll to the first control with error
          if (scrollToErrorControl && Object.keys(errorObject).length) {
            (0, utils_1.scrollToComponent)({
              componentId: (0, validateValueWithYupSchema_1.getControlId)(
                formName,
                errorObject[Object.keys(errorObject)[0]]
              ),
              focusAfterScroll: true,
            });
          }
          // no further execution
          if (errorKeysAfterValidation.length) return;
        }
        if (submitHandler) {
          // if the `submithandler` function is asyncronous we have to wait for the operation to finish
          if ((0, isAsyncFunction_1.isAsyncFunction)(submitHandler)) {
            // set submitting status
            setFormState(prev => Object.assign(Object.assign({}, prev), { isSubmitting: true }));
            // update to context as well
            formContextState === null || formContextState === void 0
              ? void 0
              : formContextState.updateFormState({ formName, update: { isSubmitting: true } });
            // submit handler will take the package ready to perform submit action and a difference object between initial values set and package ready
            yield submitHandler({
              package: onSubmitDataInterceptor ? onSubmitDataInterceptor(values) : values,
              differencePackage: onSubmitDataInterceptor
                ? (0, utils_1.getDifferenceObject)(initial, onSubmitDataInterceptor(values))
                : (0, utils_1.getDifferenceObject)(initial, values),
            });
            // set submitting status
            setFormState(prev => Object.assign(Object.assign({}, prev), { isSubmitting: false }));
            // update to context as well
            formContextState === null || formContextState === void 0
              ? void 0
              : formContextState.updateFormState({ formName, update: { isSubmitting: false } });
          }
          // if submit handler is not asyncronous function then
          if (!(0, isAsyncFunction_1.isAsyncFunction)(submitHandler)) {
            if (submitHandler)
              submitHandler({
                package: onSubmitDataInterceptor ? onSubmitDataInterceptor(values) : values,
                differencePackage: onSubmitDataInterceptor
                  ? (0, utils_1.getDifferenceObject)(initial, onSubmitDataInterceptor(values))
                  : (0, utils_1.getDifferenceObject)(initial, values),
              });
          }
        }
        // set submition status
        setFormState(prev => Object.assign(Object.assign({}, prev), { submitionError: false }));
        // update to context as well
        formContextState === null || formContextState === void 0
          ? void 0
          : formContextState.updateFormState({ formName, update: { submitionError: false } });
      } catch (error) {
        // set submition status
        setFormState(prev => Object.assign(Object.assign({}, prev), { submitionError: true }));
        // update to context as well
        formContextState === null || formContextState === void 0
          ? void 0
          : formContextState.updateFormState({ formName, update: { submitionError: true } });
        throw new Error(`Error While Submiting Form. ${error}`);
      }
    });
  }
  function register(controlName, registerParamProps) {
    // set the control value if the controlFillerFn is supplied
    (() =>
      __awaiter(this, void 0, void 0, function* () {
        if (
          registerParamProps === null || registerParamProps === void 0 ? void 0 : registerParamProps.controlFillerFn
        ) {
          if ((0, isAsyncFunction_1.isAsyncFunction)(registerParamProps.controlFillerFn)) {
            // set control filling to true
            setControlfilling(prev => Object.assign(Object.assign({}, prev), { [controlName]: true }));
            // set the form state too
            setFormState(prev => Object.assign(Object.assign({}, prev), { isControlPreFilling: true }));
            // update to context as well
            formContextState === null || formContextState === void 0
              ? void 0
              : formContextState.updateFormState({ formName, update: { isControlPreFilling: true } });
            // get values from controlFillerFn
            const controlFillerValue = yield registerParamProps.controlFillerFn();
            // set the received value
            setValues(prev => Object.assign(Object.assign({}, prev), { [controlName]: controlFillerValue }));
            // set control filling to false
            setControlfilling(prev => Object.assign(Object.assign({}, prev), { [controlName]: false }));
            // set the form state too
            setFormState(prev => Object.assign(Object.assign({}, prev), { isControlPreFilling: false }));
            // update to context as well
            formContextState === null || formContextState === void 0
              ? void 0
              : formContextState.updateFormState({ formName, update: { isControlPreFilling: false } });
          }
          if (
            typeof registerParamProps.controlFillerFn === 'function' &&
            !(0, isAsyncFunction_1.isAsyncFunction)(registerParamProps.controlFillerFn)
          ) {
            const controlFillerValue = registerParamProps.controlFillerFn();
            setValues(prev => Object.assign(Object.assign({}, prev), { [controlName]: controlFillerValue }));
          }
        }
      }))();
    // function to handle touched state
    function onTouchHandler() {
      setTouchedControls(prev => Object.assign(Object.assign({}, prev), { [controlName]: true }));
    }
    // to handle value change
    function onChangeHandler(event) {
      const isOnChangeEvent = event instanceof Event || !!event.target;
      // there is `setEnable` function or value
      if (
        registerParamProps &&
        (registerParamProps === null || registerParamProps === void 0 ? void 0 : registerParamProps.setEnable)
      ) {
        setControlEnable(prev =>
          Object.assign(Object.assign({}, prev), {
            [controlName]: (
              registerParamProps === null || registerParamProps === void 0 ? void 0 : registerParamProps.setEnable
            )
              ? typeof registerParamProps.setEnable === 'function'
                ? registerParamProps.setEnable({
                    bindValue: isOnChangeEvent ? event.target.value : event,
                    bindvalues: values,
                  })
                : typeof registerParamProps.setEnable === 'boolean'
                ? registerParamProps.setEnable
                : true
              : true,
          })
        );
      }
      // if onChangeInterceptor is applied then we transfer the flow to the interceptor and set the values returned by the interceptor to the form values
      if (onChangeInterceptor) {
        let interceptedValues = {};
        if (isOnChangeEvent) {
          interceptedValues = onChangeInterceptor({
            values: Object.assign(Object.assign({}, values), {
              [controlName]: (
                registerParamProps === null || registerParamProps === void 0
                  ? void 0
                  : registerParamProps.setCustomValue
              )
                ? registerParamProps.setCustomValue(event.target.value)
                : event.target.value,
            }),
            touchedErrors,
            errors,
            touchedControls,
          });
        } else {
          interceptedValues = onChangeInterceptor({
            values: Object.assign(Object.assign({}, values), {
              [controlName]: (
                registerParamProps === null || registerParamProps === void 0
                  ? void 0
                  : registerParamProps.setCustomValue
              )
                ? registerParamProps.setCustomValue(event)
                : event,
            }),
            touchedErrors,
            errors,
            touchedControls,
          });
        }
        setValues(interceptedValues);
        // also set the context
        formContextState === null || formContextState === void 0
          ? void 0
          : formContextState.updateFormData({ formName, update: { interceptedValues } });
        // we do not continue executing after this
        return;
      }
      // onChangeInterceptor logic ends
      // if argument is an event
      if (isOnChangeEvent) {
        event.stopPropagation();
        const valuesToUpdate = Object.assign(Object.assign({}, values), {
          [controlName]: (
            registerParamProps === null || registerParamProps === void 0 ? void 0 : registerParamProps.setCustomValue
          )
            ? registerParamProps.setCustomValue(event.target.value)
            : event.target.value,
        });
        // update the values
        setValues(valuesToUpdate);
        // also set the context
        formContextState === null || formContextState === void 0
          ? void 0
          : formContextState.updateFormData({ formName, update: { valuesToUpdate } });
      } else {
        const valuesToUpdate = Object.assign(Object.assign({}, values), {
          [controlName]: (
            registerParamProps === null || registerParamProps === void 0 ? void 0 : registerParamProps.setCustomValue
          )
            ? registerParamProps.setCustomValue(event)
            : event,
        });
        // update the values
        setValues(valuesToUpdate);
        // also set the context
        formContextState === null || formContextState === void 0
          ? void 0
          : formContextState.updateFormData({ formName, update: { valuesToUpdate } });
      }
      // update the touched state if it is `true`
      if (touchOnChange) {
        onTouchHandler();
      }
    }
    return {
      id: (0, validateValueWithYupSchema_1.getControlId)(formName || '', controlName),
      controlName,
      touchedError: touchedErrors[controlName] || null,
      error: errors[controlName] || null,
      hasError: !!errors[controlName],
      touched: !!touchedControls[controlName],
      bindValue: values[controlName],
      onTouchHandler,
      onChangeHandler,
      enable: controlEnable[controlName] || true,
      controlfilling: controlfilling[controlName] || false,
    };
  }
  return {
    bindValues: values,
    setBindValues: setValues,
    errors,
    setErrors,
    formState,
    register,
    onSubmitHandler,
    setFormState,
  };
}
exports.useForm = useForm;
//# sourceMappingURL=index.js.map
