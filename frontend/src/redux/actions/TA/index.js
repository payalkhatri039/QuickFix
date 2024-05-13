import {
  ADDNEW_FAQ,
  GETALL_FAQ,
  EDIT_FAQ,
  GET_ONGOINGASSIGNMENTID
} from './../type';
const baseUrl = 'http://localhost:3001/user/assignment/';

/**
 * method called when adding new FAQ on the ongoing assignment
 * @param assignmentId
 * @param ques
 * @param ans
 * @returns type ADDNEW_FAQ and the payload
 */

export const addNewFAQ = (assignmentId, ques, ans) => async (dispatch) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assignmentId: assignmentId, ques: ques, ans: ans })
  };

  return fetch(baseUrl, requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('received ', responseJson);
      dispatch({
        type: 'ADDNEW_FAQ',
        payload: responseJson
      });
    });
};

/**
 * method called when fetching all the FAQs on all assignments
 * @returns type GETALL_FAQ and the payload
 */
export const getAllFAQs = () => {
  try {
    return async (dispatch) => {
      const result = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await result.json();
      console.log(json);
      if (json) {
        dispatch({
          type: GETALL_FAQ,
          payload: json
        });
      } else {
        console.log('Unable to fetch!');
      }
    };
  } catch (error) {
    console.log('Error while calling getAllTodos' + error.message);
  }
};

/**
 * method called when fetching all the FAQs on all assignments based on TA logged in
 * @param taId
 * @returns type GETALL_FAQ and the payload
 */
export const getAllFAQsAccordingToTA = (taId) => {
  try {
    return async (dispatch) => {
      const result = await fetch(
        `http://localhost:3001/courses/user/${taId}/assignmentList`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const json = await result.json();
      console.log(json);
      if (json) {
        dispatch({
          type: GETALL_FAQ,
          payload: json
        });
      } else {
        console.log('Unable to fetch!');
      }
    };
  } catch (error) {
    console.log('Error while calling getAllFAQsAccordingToTA' + error.message);
  }
};

/**
 * method called when fetching all the FAQs and assignments based on TA logged in
 * @param taId
 * @returns type GET_ONGOINGASSIGNMENTID and the payload
 */
export const getOngoingAssignmentId = (taId) => {
  try {
    return async (dispatch) => {
      const result = await fetch(
        `http://localhost:3001/courses/user/${taId}/OngoingAssignmentId`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const json = await result.json();
      console.log('json is', json);
      if (json) {
        dispatch({
          type: GET_ONGOINGASSIGNMENTID,
          payload: json
        });
      } else {
        console.log('Unable to fetch!');
      }
    };
  } catch (error) {
    console.log('Error while calling getOngoingAssignmentId' + error.message);
  }
};

/**
 * method called when user wants to update the FAQ
 * @param id
 * @param faq
 * @returns type EDIT_FAQ and the payload
 */
export const editFAQ = (id, faq) => async (dispatch) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id, FAQs: faq })
  };

  return fetch(`${baseUrl}faq/`, requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('received editFAQ ', faq);
      dispatch({
        type: EDIT_FAQ,
        payload: faq
      });
    });
};
