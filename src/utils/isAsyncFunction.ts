/* eslint-disable import/prefer-default-export */
// import { AsyncFunction } from '../@types';

// function isAsyncFunction(fn: any): fn is AsyncFunction {
//   return fn.constructor === Promise;
// }

function isAsyncFunction(fn: any) {
  const fnString = fn.toString();
  // Check for async/await or Promise usage
  return /async |\.then\(|await/.test(fnString);
}

export { isAsyncFunction };
