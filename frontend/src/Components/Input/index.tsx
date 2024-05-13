import React from 'react';
import { InputState } from '../../types/commonTypes';
import './input.scss';
import '../../styles/SignIn-Up/signIn-Up.scss';

/**
 *
 * Component for app Input element
 */

type ComponentType = 'text' | 'textarea';

interface IInput {
  inputState: InputState;
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  component?: ComponentType;
  inputClass?: string;
}

/**
 *
 * @param IInput
 * @returns Input component
 *
 * Input is a reusable compoent which returns a Input ui
 * and manages all value change.
 */

const Input = ({
  label,
  id,
  type = 'text',
  inputState,
  placeholder = '',
  readOnly = false,
  component = 'text',
  inputClass = ''
}: IInput) => {
  const { hasError, setValue, value, errorMessage } = inputState;
  const onValueChange = (value: string) => setValue(value);
  return (
    <div className="inForm-container">
      <label className="input-label">{label}</label>
      {component === 'text' ? (
        <input
          type={type}
          id={id}
          name={id}
          className={`loginInput input ${inputClass}`}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      ) : (
        <textarea
          id={id}
          name={id}
          className={`tInput ${hasError ? 'error' : null}`}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      )}

      {hasError ? <small className="error">{errorMessage}</small> : null}
    </div>
  );
};

export default Input;
