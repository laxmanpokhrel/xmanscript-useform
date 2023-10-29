"use strict";
/* eslint-disable import/prefer-default-export */
// import { AsyncFunction } from '../@types';
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAsyncFunction = void 0;
// function isAsyncFunction(fn: any): fn is AsyncFunction {
//   return fn.constructor === Promise;
// }
function isAsyncFunction(fn) {
    const fnString = fn.toString();
    // Check for async/await or Promise usage
    return /async |\.then\(|await/.test(fnString);
}
exports.isAsyncFunction = isAsyncFunction;
//# sourceMappingURL=isAsyncFunction.js.map