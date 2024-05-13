/**
 * This file contains types which are shared by various component
 */

export interface InitState {
  value: string;
  id: string;
  errorMessage: string;
}
interface BaseState extends InitState {
  hasError: boolean;
  changeErrorMessage: (message: string) => void;
}

export interface InputState extends BaseState {
  setValue: (value: string) => void;
}

export interface DropDownState extends BaseState {
  key: string;
  setValue: (key: string) => void;
  setList: (list: Array<KeyValueType>, defaultKey?: string) => void;
  dataList: Array<KeyValueType>;
}

export interface ValidatorReturn {
  isValid: boolean;
  errorMessage: string;
}

export type Validator = (data: string) => ValidatorReturn;

export interface KeyValueType<T = string> {
  key: string;
  value: T;
}
export interface InitStateObj {
  [id: string]: InitState;
}

export type ReducerActionType<T = any> = {
  type: string;
  payload: T;
};
export interface BaseResponse<T> {
  response: T;
  error: any;
  code: number | string;
  statusCode: number;
}

export type DisplayState = 'SUCCESS' | 'LOADING' | 'ERROR' | 'DEFAULT';
