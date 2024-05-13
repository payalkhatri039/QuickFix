import * as actionTypes from '../actions/type';

/**
 * @param {*} state : initialState consists of upcoming and previous lists
 * @param {*} action : consists of the type and the payload
 * @returns the updated state of the courses
 */
export const coursesReducers = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GETALL_COURSE:
      return action.payload;
    case actionTypes.GETALL_COURSEUSERS:
      return action.payload;
    case actionTypes.GET_USER_COURSES:
      return [...action.payload];
    default:
      return state;
  }
};
