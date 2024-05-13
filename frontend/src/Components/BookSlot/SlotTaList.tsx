import React, { useEffect, useState } from 'react';
import { getCourseTAList } from '../../helper/handleAPI';
import SlotTa from './SlotTa';
import '../../styles/BookSlot/index.scss';

interface ISlotTaList {
  courseID: string;
  onTaSelected: (id: string) => void;
  selectedTA: string;
}

/**
 *
 * @param param0:ISlotTaList
 * @returns React.Component
 *
 * @description
 * This is a helper React Component that calls getCourseTAList and
 * calls a loop over ta list and pass on the ta detail to SlotTa component.
 * This component also maintains event bubbling and takes the selected ta's ID
 * from data-id of selected SlotTa and onTaSelected that is passed as prop from
 * BookSlot component.
 */

export default function SlotTaList({
  courseID,
  onTaSelected,
  selectedTA
}: ISlotTaList) {
  const [taList, setTaList] = useState([]);
  useEffect(() => {
    getCourseTAList(courseID).then((res) => setTaList(res.taList || []));
  }, []);

  const onTAClicked = (e) => {
    const element = e.target.closest('.ta_base_container');
    onTaSelected(element.getAttribute('data-id'));
  };
  return (
    <div className="ta_list_base_container" onClick={onTAClicked}>
      {taList.map((ta) => (
        <SlotTa ta={ta} key={ta.id} selected={selectedTA === ta.id} />
      ))}
    </div>
  );
}
