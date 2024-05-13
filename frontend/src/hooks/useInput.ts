/* eslint-disable no-restricted-syntax */
import { useState, useCallback, useEffect } from 'react';
import { InitState, InputState, Validator } from '../types/commonTypes';

/**
 *
 * @param initialInput: InitState
 * @param validators: Array<Validator>
 * @param updateValidation (id: string, validateFnc: () => boolean) => void
 * @returns InputState
 *
 * @description
 * useInput is a inhouse hook that takes
 *  a. initial state which includes
 *   1. Initial Value
 *   2. Initial Error message
 *   3. ID
 *  b. Array of validators -> Validation required on input when user submits the form
 *  c. updateValidation -> This is a optional paramter which is provided by
 *     onFormValidation hook to validate the form when user submit the form.
 *
 */

export default function useInput(
  initialInput: InitState,
  validators: Array<Validator>,
  updateValidation?: (id: string, validateFnc: () => boolean) => void
): InputState {
  const {
    value: initialValue,
    id,
    errorMessage: initialErrorMessage
  } = initialInput;
  const [value, setValue] = useState(initialValue);
  const [hasError, setHasError] = useState(false);
  const [initialMessage] = useState(initialErrorMessage);
  const [errorMessage, setErrorMessage] = useState<string>(initialErrorMessage);

  const _setValue = (changedValue: string) => {
    if (hasError) {
      setHasError(false);
    }
    setValue(changedValue);
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

  const changeErrorMessage = (_errorMessage: string = '') => {
    if (_errorMessage.length > 0) {
      setErrorMessage(_errorMessage);
      setHasError(true);
    } else {
      setErrorMessage(initialErrorMessage);
      setHasError(false);
    }
  };

  return {
    value,
    hasError,
    errorMessage,
    id,
    setValue: _setValue,
    changeErrorMessage
  };
}
