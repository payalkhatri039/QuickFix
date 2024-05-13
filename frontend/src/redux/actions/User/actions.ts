import {
  REMOVE_BOOKED_SLOT,
  UPDATE_BOOKING_ID,
  UPDATE_SHOW_MODAL
} from '../type';
import { DisplayState } from '../../../types/commonTypes';
import {
  ADD_TA_SLOTS,
  RESET_SLOT_SELECTION,
  UPDATE_CALENDAR_DISPLAY_STATE,
  UPDATE_SELECTED_SLOTS_DATE,
  UPDATE_USER_DETAILS
} from '../type';

/**
 *
 * @param userDetails
 * @returns Redux Action
 *
 * this action is called when the getUserDetail
 * API returns a success message with complete
 * user details
 */

export const updateUserDetail = (userDetails) => {
  return {
    type: UPDATE_USER_DETAILS,
    payload: userDetails
  };
};

/**
 *
 * @param taSlots
 * @returns Redux Action
 *
 * @description
 * this action is called when the getTaSlots
 * API returns array of TA slots
 */

export const addTaSlots = (taSlots) => {
  return {
    type: ADD_TA_SLOTS,
    payload: taSlots
  };
};

/**
 *
 * @param state : DisplayState
 * @returns Redux Action
 *
 * @description
 * this is called to update the loading
 * state of calendar on book slots page
 */

export const updateTaCalendarDisplayState = (state: DisplayState) => {
  return {
    type: UPDATE_CALENDAR_DISPLAY_STATE,
    payload: state
  };
};

/**
 *
 * @param taID
 * @param date
 * @returns Redux Action
 *
 * @description
 * this action is called when user selects
 * a available TA date to show list of slots
 */

export const updateSelectedSlotDate = (taID: string, date: string) => {
  return {
    type: UPDATE_SELECTED_SLOTS_DATE,
    payload: { taID, date }
  };
};

/**
 *
 * @returns Redux Action
 *
 * @description
 * this action is called when the bookslot
 * page unmounts
 */

export const resetSlotsSelection = () => {
  return {
    type: RESET_SLOT_SELECTION
  };
};

/**
 *
 * @param show
 * @returns Redux Action
 *
 * @description
 * this action is called when dev wants to
 * toggle the booking confirm modal state
 */

export const showBookingConfirmModal = (show: boolean) => {
  return {
    type: UPDATE_SHOW_MODAL,
    payload: show
  };
};

/**
 *
 * @param bookingID
 * @returns Redux Action
 *
 * @description
 * this action is called when a successful booking is
 * created to update the store with latest booking ID
 */

export const updateBookingId = (bookingID: string) => {
  return {
    type: UPDATE_BOOKING_ID,
    payload: bookingID
  };
};

/**
 *
 * @param slotID
 * @param taID
 * @param date
 * @returns Redux Action
 *
 * @description
 * this action is called when student books a particular
 * slot and the slot needs to be removed from the store
 */

export const removeSlot = (slotID, taID, date) => {
  return {
    type: REMOVE_BOOKED_SLOT,
    payload: {
      slotID,
      taID,
      date
    }
  };
};
