import { GET_ALL_DETAILS } from '../type';
const baseUrl = 'http://localhost:3001/courses/details';

// Make an API call to fetch courses from the server
/**
 *
 * @param {*} courseid
 * @returns type GET_ALL_DETAILS and the payload
 */
export const getAllDetails = (courseid) => {
  console.log('get all dets', courseid);
  try {
    return async (dispatch) => {
      console.log('get all dets', courseid);
      const result = await fetch(`${baseUrl}/${courseid}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await result.json();
      console.log('getting all the data', json);
      if (json) {
        dispatch({
          type: GET_ALL_DETAILS,
          payload: json
        });
      } else {
        console.log('Unable to fetch!');
      }
    };
  } catch (error) {
    console.log('Error while calling getAllDetails' + error.message);
  }
};
