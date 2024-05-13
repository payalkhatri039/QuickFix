import { DisplayState } from '../../types/commonTypes';
import {
  ADD_TA_SLOTS,
  REMOVE_BOOKED_SLOT,
  RESET_SLOT_SELECTION,
  UPDATE_BOOKING_ID,
  UPDATE_CALENDAR_DISPLAY_STATE,
  UPDATE_SELECTED_SLOTS_DATE,
  UPDATE_SHOW_MODAL
} from '../actions/type';

interface ITaSlotInitialState {
  slots: any;
  selectedDateSlots: Array<any>;
  displayState: DisplayState;
  selectedDate: Date;
  showModal: boolean;
  bookingID: string;
}

const initialState: ITaSlotInitialState = {
  slots: {},
  selectedDateSlots: [],
  displayState: 'DEFAULT',
  selectedDate: null,
  showModal: false,
  bookingID: ''
};

export const taSlotsReducer = (
  state: ITaSlotInitialState = initialState,
  action
): ITaSlotInitialState => {
  switch (action.type) {
    case ADD_TA_SLOTS: {
      state.slots = { ...state.slots, ...action.payload };
      return state;
    }
    case UPDATE_CALENDAR_DISPLAY_STATE: {
      return {
        ...state,
        displayState: action.payload
      };
    }

    case UPDATE_SELECTED_SLOTS_DATE: {
      const { taID, date } = action.payload;
      if (state.slots[taID] && state.slots[taID][date]) {
        state.selectedDateSlots = state.slots[taID][date];
        if (state.slots[taID][date].length > 0) {
          console.log(state.slots[taID][date]);
          state.selectedDate = new Date(state.slots[taID][date][0].day);
        } else {
          state.selectedDate = null;
        }
      }
      return { ...state };
    }

    case RESET_SLOT_SELECTION: {
      return {
        ...state,
        selectedDateSlots: [],
        selectedDate: null
      };
    }

    case UPDATE_SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload
      };

    case REMOVE_BOOKED_SLOT: {
      const { slotID, taID, date } = action.payload;
      const updatedTASlots = state.slots[taID][date].filter(
        ({ _id }) => _id !== slotID
      );
      const updatedSelectedSlots = state.selectedDateSlots.filter(
        ({ _id }) => _id !== slotID
      );
      return {
        ...state,
        slots: {
          ...state.slots,
          [taID]: {
            ...state.slots[taID],
            [date]: updatedTASlots
          }
        },
        selectedDateSlots: updatedSelectedSlots
      };
    }

    case UPDATE_BOOKING_ID: {
      return {
        ...state,
        bookingID: action.payload
      };
    }

    default:
      return state;
  }
};
