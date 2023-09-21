import { AsyncFunction } from '../@types';

export default function isAsyncFunction(fn: any): fn is AsyncFunction {
  return fn.constructor === Promise;
}
