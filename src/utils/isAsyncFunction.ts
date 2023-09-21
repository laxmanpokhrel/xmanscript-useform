/* eslint-disable import/prefer-default-export */
import { AsyncFunction } from '../@types';

function isAsyncFunction(fn: any): fn is AsyncFunction {
  return fn.constructor === Promise;
}

export { isAsyncFunction };
