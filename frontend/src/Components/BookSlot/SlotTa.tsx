import React from 'react';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
import Avatar, { genConfig } from 'react-nice-avatar';
import { taMaleAvatar } from '../../constant';

/**
 *
 * @param param0
 * @returns React.Component
 *
 * @description
 * This component displays a container with TA name.
 * On click this component SlotTaList calls the slot api
 * for selected TA that it fetches from data-id of this component.
 */

export default function SlotTa({ ta, selected }) {
  const { firstName, lastName, id } = ta;
  const myConfig = genConfig(taMaleAvatar);
  return (
    <div className="ta_base_container" data-id={id}>
      <Avatar style={{ width: '1.5rem', height: '1.5rem' }} {...myConfig} />

      <p style={{ marginLeft: '8px' }}>{`${firstName} ${lastName}`}</p>
      <div className="left">
        <div className="neo_div">
          {selected ? <FaAngleRight size={16} /> : <FaAngleDown size={16} />}
        </div>
      </div>
    </div>
  );
}
