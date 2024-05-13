/* eslint-disable no-restricted-syntax */
import { useState, useCallback, useEffect } from 'react';
import {
  DropDownState,
  InitState,
  KeyValueType,
  Validator
} from '../types/commonTypes';

type DropDownMap = {
  [key: string]: string;
};

/**
 *
 * @param initialInput: InitState
 * @param validators: Array<Validator>
 * @param updateValidation (id: string, validateFnc: () => boolean) => void
 *
 * @description
 * useDropDown is a inhouse hook that takes
 *  a. initial state which includes
 *   1. Initial Value
 *   2. Initial Error message
 *   3. ID
 *  b. Array of validators -> Validation required on input when user submits the form
 *  c. updateValidation -> This is a optional paramter which is provided by
 *     onFormValidation hook to validate the form when user submit the form.
 *
 *  @returns DropDownState -> Dropdown state has setList which can be used to update
 *  the list on api response.
 *
 */

export default function useDropDown(
  initialInput: InitState,
  validators: Array<Validator>,
  updateValidation?: (id: string, validateFnc: () => boolean) => void
): DropDownState {
  const {
    value: initialValue,
    id,
    errorMessage: initialErrorMessage
  } = initialInput;
  const [value, setValue] = useState(initialValue);
  const [key, setKey] = useState<string>('');
  const [data, setData] = useState<Array<KeyValueType>>([]);
  const [hasError, setHasError] = useState(false);
  const [initialMessage] = useState(initialErrorMessage);
  const [listMap, setListMap] = useState<DropDownMap>({});
  const [errorMessage, setErrorMessage] = useState<string>(initialErrorMessage);

  const _setValue = (key: string) => {
    console.log('set value called', key);
    if (hasError) {
      setHasError(false);
    }
    setKey(key);
    setValue(listMap[key]);
  };

  const setList = (list: Array<KeyValueType>, defaultKey: string = '') => {
    setData(list);
    if (list.length > 0) {
      const map: DropDownMap = {};
      list.forEach((item) => {
        map[item.key] = item.value;
      });
      setListMap(map);
      if (defaultKey && map[defaultKey]) {
        setValue(map[defaultKey]);
        setKey(defaultKey);
      } else {
        setValue(list[0].value);
        setKey(list[0].key);
      }
    } else {
      setValue('');
    }
  };

  const validate = useCallback(() => {
    if (validators) {
      for (const validator of validators) {
        const { errorMessage: validatorErrorMessage, isValid } =
          validator(value);
        if (!isValid) {
          setErrorMessage(
            initialMessage.length ? initialMessage : validatorErrorMessage
          );
          setHasError(true);
          return false;
        }
      }
      setHasError(false);
      return true;
    }
    return true;
  }, [value, errorMessage, initialMessage]);

  useEffect(() => {
    if (updateValidation) {
      updateValidation(id, validate);
    }
  }, [id, validate]);

  const changeErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setHasError(true);
  };

  return {
    key,
    value,
    hasError,
    errorMessage,
    id,
    setValue: _setValue,
    changeErrorMessage,
    setList,
    dataList: data
  };
}
