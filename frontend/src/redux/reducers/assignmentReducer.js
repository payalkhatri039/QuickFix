import * as actionTypes from '../actions/type';

/**
 *
 * @param {*} state :consists of initial assignment list and final assignment list
 * @param {*} action :consists of the type and the payload
 * @returns the updated state of assignment
 */
const assignmentReducers = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_DETAILS:
      return { ...action.payload };

    default:
      return state;
  }
};

export default assignmentReducers;
