import React, { useState } from 'react';
import { DropDownState } from '../../types/commonTypes';
import './dropdown.scss';
import { FaCaretDown } from 'react-icons/fa';

interface IDropDown {
  dropDownState: DropDownState;
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
}

/**
 *
 * @param IDropDown
 * @returns DropDown component
 *
 * DropDown is a reusable compoent which returns a DropDown ui
 * and manages all value change.
 */

const DropDown = ({
  label,
  id,
  type = 'text',
  dropDownState,
  placeholder = ''
}: IDropDown) => {
  const { hasError, setValue, value, errorMessage, dataList } =
    dropDownState || {};
  const [showDropDown, setShowDropDown] = useState(false);
  const onListItemClick = (e) => {
    // console.log(e.target.getAttribute("data-val"));
    setValue(e.target.getAttribute('data-val'));
    setShowDropDown(!showDropDown);
  };
  return (
    <div className="inForm-container">
      <label className="dd_input_label">{label}</label>
      <div className="ddBaseContainer">
        <div className={`ddContainer dInput ${hasError ? 'error' : ''}`}>
          <input
            type={type}
            id={id}
            name={id}
            className={'ddInput'}
            value={value}
            placeholder={placeholder}
            readOnly={true}
          />
          <FaCaretDown onClick={() => setShowDropDown(!showDropDown)} />
        </div>
        {showDropDown ? (
          <div className="ddOptionContainer">
            {dataList.map((value) => (
              <li
                className={`dd-list-item`}
                key={value.key}
                data-val={value.key}
                onClick={onListItemClick}
              >
                {value.value}
              </li>
            ))}
          </div>
        ) : null}
      </div>

      {hasError ? <small className="error">{errorMessage}</small> : null}
    </div>
  );
};

export default DropDown;
