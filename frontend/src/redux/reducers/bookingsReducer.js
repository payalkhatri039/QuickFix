import { ADD_BOOKING_DETAILS } from '../actions/type';
import { UPDATE_BOOKING_DETAILS } from '../actions/type';

const initialState = {
  upcoming: [],
  previous: []
};
/**
 * @param {*} state : initialState consists of upcoming and previous lists
 * @param {*} action : consists of the type and the payload
 * @returns the updated state of the bookingsReducer
 */
export const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKING_DETAILS: {
      state = action.payload;
      return state;
    }
    case UPDATE_BOOKING_DETAILS: {
      state.upcoming = [...state.upcoming, ...action.payload.upcoming];
      state.previous = [...state.previous, ...action.payload.previous];
      return { ...state };
    }
    default:
      return state;
  }
};
