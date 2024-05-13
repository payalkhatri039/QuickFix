import { defaultHeader } from '../../../constant';
import { callApi } from '../../../helper/ApiHelper';
import { GETALL_COURSE, GETALL_COURSEUSERS, GET_USER_COURSES } from '../type';
const baseUrl = 'http://localhost:3001/courses';
const userBaseURL = 'http://localhost:3001/user';

/**
 * method called when fetching courses from the server
 * @returns type GETALL_COURSE and the payload
 */
export const getAllCourses = () => {
  try {
    return async (dispatch) => {
      const result = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await result.json();
      console.log('HI', json);
      if (json) {
        dispatch({
          type: GETALL_COURSE,
          payload: json
        });
      } else {
        console.log('Unable to fetch!');
      }
    };
  } catch (error) {
    console.log('Error while calling getAllCourses' + error.message);
  }
};

/**
 * method called when fetching courses from the server
 * @returns type GETALL_COURSE and the payload
 */
export const getAllCourseUsers = () => {
  try {
    return async (dispatch) => {
      const result = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await result.json();
      console.log('HI', json);
      if (json) {
        dispatch({
          type: GETALL_COURSE,
          payload: json
        });
      } else {
        console.log('Unable to fetch!');
      }
    };
  } catch (error) {
    console.log('Error while calling getAllCourses' + error.message);
  }
};

/**
 * method called when fetching courses and its users from the server
 * @returns type GET_USER_COURSES and the payload
 */
export const getUserCourseDetails = (userid) => {
  try {
    console.log('user id in getuser', userid);
    return async (dispatch) => {
      const json = await callApi({
        path: `http://localhost:3001/user/${userid}`,
        method: 'GET',
        headers: defaultHeader
      });
      console.log(json);
      console.log('inside getUserCourseDetails', json);
      if (json) {
        dispatch({
          type: GET_USER_COURSES,
          payload: json.currentCourses
        });
      } else {
        console.log('Unable to fetch!');
      }
    };
  } catch (error) {
    console.log('Error while calling getUserCourseDetails' + error.message);
  }
};
