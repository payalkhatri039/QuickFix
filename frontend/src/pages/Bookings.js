import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { studentManageBookings } from '../helper/handleAPI';
import { teachingAssistantManageBookings } from '../helper/handleAPI';
import { addBookingDetails } from '../redux/actions/Bookings/index';
import { updateTABookingDetails } from '../redux/actions/Bookings/index';
import { useDispatch } from 'react-redux';
import BookingsHeader from '../Components/ManageBookings/ManageBookingsHeader';
import PreviousBookings from '../Components/ManageBookings/PreviousBookings.tsx';
import UpcomingBookings from '../Components/ManageBookings/UpcomingBookings.tsx';
import withAuth from '../Components/AuthHOC/AuthHOC';

function Bookings() {
  // state to change the tabs
  const [tab, setTab] = useState('0');
  const tabData = {
    dataV: ['Previous Bookings', 'Upcoming Bookings']
  };

  const dispatch = useDispatch();
  // retrieves the ID and user type from redux -> store - user
  const userID = useSelector((state) => state.user.id);
  const userType = useSelector((state) => state.user.userType);

  useEffect(() => {
    //Entry to API call to get the list of student booked slot with TA
    studentManageBookings(userID).then((userBooking) => {
      // student bookings are stored in store via bookingsReducer
      dispatch(addBookingDetails(userBooking));
    });

    //Entry to API call to get the list of TA's booked slot with students
    if (userType === 'TA') {
      teachingAssistantManageBookings(userID).then((userBooking) => {
        // TA bookings are stored in store via bookingsReducer
        dispatch(updateTABookingDetails(userBooking));
      });
    }
  }, []);

  /**
   * @param {*} tab : value required to set value in tab
   */
  const onTabChange = (tab) => {
    setTab(tab);
  };
  /**
   * getTabUI : To switch among components - previous bookings and upcoming bookings
   * @returns : according to the case value returns the component
   */
  const getTabUI = () => {
    switch (tab) {
      case '0': {
        return <PreviousBookings></PreviousBookings>;
      }
      case '1': {
        return <UpcomingBookings></UpcomingBookings>;
      }
      default: {
        return <div></div>;
      }
    }
  };
  /**
   * renders the bookings header component - previous bookings and upcoming bookings
   * BookingsHeader component takes the column headings and a method to set the tab value
   */
  return (
    <div className="bookings_main">
      <div className="bookings_scroller">
        <BookingsHeader tabValue={tabData.dataV} onTabChange={onTabChange} />
      </div>
      {getTabUI()}
    </div>
  );
}

export default withAuth(Bookings);
