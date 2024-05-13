import * as actionTypes from '../actions/type';

/**
 * @param {*} state : initialState consists of upcoming and previous lists
 * @param {*} action : consists of the type and the payload
 * @returns the updated state of the Assignments and FAQ
 */
export const taReducers = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADDNEW_FAQ:
      return [action.payload, ...state];
    case actionTypes.GETALL_FAQ:
      return action.payload;

    case actionTypes.EDIT_FAQ:
      const faqData = action.payload;
      state[state.length - 1].FAQs.push(faqData);
      return [...state];

    default:
      return state;
  }
};
