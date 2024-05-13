import { Button } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React, { useEffect, useState } from 'react';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { getSlashedDate } from '../../helper/DateTimeHelper';
import { getBookingDetail } from '../../helper/handleAPI';
import { IBookingDetail } from '../../types/bookSlot';
import { DisplayState } from '../../types/commonTypes';

/**
 * @param param0 isModalOpen : boolean, id : booking id
 * @returns React.Component
 *
 * @description
 * BookingConfirmModal takes
 *
 *  a. isModalOpen -> boolean if true will show modal
 *
 *  b. id -> This is a booking id that is used to call the getBookingDetail
 *           and display the booking details
 */

export default function BookingConfirmModal({ isModalOpen, id }) {
  const navigate = useNavigate();
  const handleConfirmPressed = () => {
    navigate('/bookings');
  };
  const [displayState, setDisplayState] = useState<DisplayState>('LOADING');
  const [bookingDetail, setBookingDetail] = useState<IBookingDetail>(null);
  const getBookingDetails = async () => {
    if (id.length > 0) {
      const response = await getBookingDetail(id);
      setBookingDetail(response);
      setDisplayState('SUCCESS');
      console.log('Response is', response);
    }
  };
  useEffect(() => {
    getBookingDetails();
  }, [id]);
  if (displayState === 'SUCCESS' && bookingDetail !== null) {
    return (
      <div>
        <Modal
          title="Booking Confirmed"
          open={isModalOpen}
          footer={[<Button onClick={handleConfirmPressed}>OK</Button>]}
          centered
        >
          <div className="column_flex">
            <h3>{`You are scheduled with ${bookingDetail.ta.firstName} ${bookingDetail.ta.lastName}`}</h3>
            <div className="row_flex align-center mt12">
              <div className="circle purple " />
              <h2>
                <b>15 Minutes</b>
              </h2>
            </div>
            <div style={{ marginTop: 12 }} className="row_flex align-center">
              <BsFillCalendar2CheckFill size={20} style={{ marginRight: 12 }} />
              <h2>
                <b>{`${getSlashedDate(bookingDetail.slot.day)}  ${
                  bookingDetail.slot.startTime
                } - ${bookingDetail.slot.endTime}`}</b>
              </h2>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
