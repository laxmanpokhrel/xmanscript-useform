/* eslint-disable no-unused-vars */
export interface IRegisterProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onFocus' | 'onAbort'> {
  bindvalue: any;
  onFocus: (e?: any) => void;
  onChange: (e: any) => void;
  touched: boolean;
  error: string;
  pretoucherror: any;
  controlleddisabled: boolean | undefined;
  uniquename: string;
}
