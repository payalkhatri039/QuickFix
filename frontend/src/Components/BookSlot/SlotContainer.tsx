import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAMPM, getDDMMYY } from '../../helper/DateTimeHelper';
import { bookTASlot } from '../../helper/handleAPI';
import { RootState } from '../../redux/store';
import {
  removeSlot,
  showBookingConfirmModal,
  updateBookingId
} from '../../redux/actions/User/actions';
import { useParams } from 'react-router-dom';

/**
 *
 * @returns React.Component
 *
 * @description
 * This component displays all the TA slots for a
 * particular date. When the user confirms a slot
 * bookTASlot API is called.
 */
export default function SlotContainer() {
  const { selectedDate, selectedDateSlots } = useSelector(
    (state: RootState) => state.taSlots
  );
  const { courseId } = useParams();
  useEffect(() => {
    return () => {
      dispatch(showBookingConfirmModal(false));
    };
  }, []);
  const { id } = useSelector((state: RootState) => state.user);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const dispatch = useDispatch();
  if (selectedDate == null) {
    return <div>No slot selected</div>;
  }

  const onSlotConfirmClicked = async () => {
    const requestBody = {
      studentID: id,
      slot_ID: selectedSlot._id,
      teachingAssistantID: selectedSlot.teachingAssistantId,
      courseID: courseId
    };
    const response = await bookTASlot(requestBody);
    dispatch(updateBookingId(response?.booking?._id || ''));
    dispatch(showBookingConfirmModal(true));
    dispatch(
      removeSlot(
        selectedSlot._id,
        selectedSlot.teachingAssistantId,
        getDDMMYY(selectedDate)
      )
    );
  };
  return (
    <div className="slot_base_container">
      {selectedDateSlots.map((slot) => {
        return (
          <div className="slot_item_container">
            <button
              onClick={() => setSelectedSlot(slot)}
              className={`slot_item ${
                slot._id === selectedSlot?._id ? 'selected_slot' : ''
              }`}
            >
              {getAMPM(slot.startTime)}
            </button>
            <button className="confirm_btn" onClick={onSlotConfirmClicked}>
              Confirm
            </button>
          </div>
        );
      })}
    </div>
  );
}
