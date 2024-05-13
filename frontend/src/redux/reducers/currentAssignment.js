import * as actionTypes from '../actions/type';

/**
 * @param {*} state : initialState consists of upcoming and previous lists
 * @param {*} action : consists of the type and the payload
 * @returns the updated state of the current Assignment
 */
export const currentAssignmentReducers = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_ONGOINGASSIGNMENTID:
      return action.payload.currentAssignment;

    default:
      return state;
  }
};
