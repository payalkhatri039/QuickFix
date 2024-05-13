import { ADD_BOOKING_DETAILS } from '../type';
import { UPDATE_BOOKING_DETAILS } from '../type';

/**
 * method called when student bookings are need to be stored in redux
 * @param userDetails
 * @returns type ADD_BOOKING_DETAILS and the payload
 */
export const addBookingDetails = (userDetails) => {
  return {
    type: ADD_BOOKING_DETAILS,
    payload: userDetails
  };
};

/**
 * method called when TA bookings are need to be updated in redux
 * @param userDetails
 * @returns type UPDATE_BOOKING_DETAILS and the payload
 */
export const updateTABookingDetails = (userDetails) => {
  return {
    type: UPDATE_BOOKING_DETAILS,
    payload: userDetails
  };
};
