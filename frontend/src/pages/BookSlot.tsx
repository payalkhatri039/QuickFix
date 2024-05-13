import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Confetti from 'react-confetti';
import { useParams } from 'react-router-dom';
import withAuth from '../Components/AuthHOC/AuthHOC';
import SlotCalendar from '../Components/BookSlot/SlotCalendar';
import SlotContainer from '../Components/BookSlot/SlotContainer';
import SlotTaList from '../Components/BookSlot/SlotTaList';
import { getTASlots } from '../helper/handleAPI';
import {
  addTaSlots,
  resetSlotsSelection,
  showBookingConfirmModal,
  updateTaCalendarDisplayState
} from '../redux/actions/User/actions';
import { RootState } from '../redux/store';
import BookingConfirmModal from '../Components/BookSlot/BookingConfirmModal';
import BaseContainer from '../Components/BaseContainer';

/**
 *
 * @returns BookSlot React.Component
 *
 * @description
 * BookSlots is React Component that initially takes courseId from params
 * and display all the TAs. User can select a TA and a avaiable slot. Upon
 * confirmation a popup is shown with booking details.
 */

function BookSlot() {
  const { courseId } = useParams();
  const { slots, showModal, bookingID } = useSelector(
    (state: RootState) => state.taSlots
  );
  const dispatch = useDispatch();
  const [selectedTA, setSelectedTA] = useState(null);
  useEffect(() => {
    return () => {
      dispatch(showBookingConfirmModal(false));
    };
  }, []);

  /**
   * @param id : ta id
   * This function will call the getTASlots if the slots are not
   * available in the reducer (for caching purpose) and updates
   * the reducer
   */
  const onTaSelected = useCallback(
    async (id: string) => {
      setSelectedTA(id);
      dispatch(resetSlotsSelection());
      if (slots[id] === undefined) {
        dispatch(updateTaCalendarDisplayState('LOADING'));
        const taSlots = await getTASlots(id);
        setTimeout(() => {
          dispatch(addTaSlots({ [id]: taSlots }));
          dispatch(updateTaCalendarDisplayState('SUCCESS'));
        }, 1000);
      }
    },
    [slots]
  );
  return (
    <BaseContainer>
      <div className="book_slot_container">
        <h2 className="mb12">Book Slot</h2>
        <div className="flex book_slot_flex_base_container">
          <div className="row_flex gap pl100">
            <div style={{ flex: 0.3 }}>
              <SlotTaList
                courseID={courseId}
                onTaSelected={onTaSelected}
                selectedTA={selectedTA}
              />
            </div>
            <div className="slot_calendar_base_container">
              <SlotCalendar taID={selectedTA} />
            </div>
            <div style={{ flex: 0.25 }}>
              <SlotContainer />
            </div>
          </div>
        </div>
        {showModal ? (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            wind={0}
          />
        ) : null}
        <BookingConfirmModal isModalOpen={showModal} id={bookingID} />
      </div>
    </BaseContainer>
  );
}

export default withAuth(BookSlot);
