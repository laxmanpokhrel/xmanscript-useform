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
const React = __importStar(require("react"));
const formContext_1 = __importDefault(require("../context/formContext"));
function usePreventUnload(formName, preventUnload) {
    var _a, _b;
    const formContextState = React.useContext(formContext_1.default);
    const { hasChanges } = ((_a = formContextState === null || formContextState === void 0 ? void 0 : formContextState.formContextData[formName]) === null || _a === void 0 ? void 0 : _a.state) || { hasChanges: false };
    const { isSubmitionSuccess } = ((_b = formContextState === null || formContextState === void 0 ? void 0 : formContextState.formContextData[formName]) === null || _b === void 0 ? void 0 : _b.state) || { isSubmitionSuccess: false };
    return React.useEffect(() => {
        if (!preventUnload)
            window.addEventListener('beforeunload', e => {
                if (hasChanges && !isSubmitionSuccess) {
                    e.preventDefault();
                    e.returnValue = 'You have unsaved changes. Are you sure you want to leave this page?';
                }
            });
        return () => {
            if (!preventUnload)
                window.removeEventListener('beforeunload', () => { });
        };
    }, [hasChanges, preventUnload, isSubmitionSuccess]);
}
exports.default = usePreventUnload;
//# sourceMappingURL=usePreventUnload.js.map