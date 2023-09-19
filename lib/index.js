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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
const React = __importStar(require("react"));
const utils_1 = require("@xmanscript/utils");
const validateValueWithYupSchema_1 = require("./utils/validateValueWithYupSchema");
function useForm({ initialValues, validationSchema, metaData, validateOnSubmit } = {
    initialValues: {},
    validateOnSubmit: false,
    metaData: { DEBOUNCE_TIME: 500 },
}) {
    const [values, setValues] = React.useState(initialValues);
    const [errors, setErrors] = React.useState({});
    const [touched, _setTouched] = React.useState({});
    const [formState, _setFormState] = React.useState({});
    React.useEffect(() => {
        if (validateOnSubmit)
            return;
        const timerInstance = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            if (validationSchema) {
                let errorObject = {};
                // for yup validation schema
                if (typeof validationSchema === 'object') {
                    errorObject = yield (0, validateValueWithYupSchema_1.validateValueWithYupSchema)(validationSchema, values);
                }
                // for validation function
                if (typeof validationSchema === 'function') {
                    errorObject = validationSchema(values);
                }
                // set the error object
                setErrors((0, utils_1.intersectObjects)(errorObject, touched));
            }
        }), metaData.DEBOUNCE_TIME || 500);
        // eslint-disable-next-line consistent-return
        return () => clearTimeout(timerInstance);
    }, [values, touched]);
    function handleSubmit() { }
    function register() {
        return {};
    }
    return {
        bindValues: values,
        setBindValues: setValues,
        errors,
        setErrors,
        touched,
        formState,
        register,
        handleSubmit,
    };
}
exports.default = useForm;
//# sourceMappingURL=index.js.map