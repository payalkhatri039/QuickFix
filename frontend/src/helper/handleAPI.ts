import { defaultHeader } from '../constant';
import { IBookingDetail } from '../types/bookSlot';
import { callApi } from './ApiHelper';
import { tranformSlotsResponse } from './BookSlotHelper';

/**
 * Description :  Validates the user by sending the POST request to server, 
  receives a token if correctly validated and an error message if not
 * @param username : username provided by user during login
 * @param password : username provided by user during login
 * @returns : response -> validated token for the user
 */
export const validateUser = async (username, password) => {
  const userCreds = { username, password };
  try {
    const response = await callApi({
      path: `/user/signin`,
      headers: defaultHeader,
      method: 'POST',
      body: userCreds
    });
    return response;
  } catch (err) {
    console.log('handleAPI:: validateUser: error: ', err);
  }
};

/**
 * Description : API call to backend for registering a new user
 * @param userDetails : Details provided by new user while signing up
 * @returns : response from server - a new unique token
 */
export const signUpUserDetails = async (userDetails) => {
  const userSignInDetails = { ...userDetails };
  try {
    const response = await callApi({
      path: `/user/signup`,
      method: 'POST',
      headers: defaultHeader,
      body: userSignInDetails
    });
    return response;
  } catch (error) {
    console.log('handleAPI:: validateUser: error: ', error);
  }
};

/**
 *
 * @param userDetails
 * @returns 200 Ok which means a mail is successfully sent on registered email address
 *
 */

export const forgotPassowordRequest = async (userDetails) => {
  try {
    const response = await callApi({
      path: '/user/forgotpassword',
      method: 'POST',
      headers: defaultHeader,
      body: userDetails
    });
    if (response.error) {
      throw new Error(response.error.message);
    }
    return response;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param token
 * @returns success
 *
 * @description
 * This function is called when user lands on
 * change password page to verify if the jwt token
 * is valid.
 */

export const verifyForgotPasswordReqeust = async (token) => {
  try {
    const response = await callApi({
      path: `/user/forgotpassword?token=${token}`,
      method: 'GET',
      headers: defaultHeader
    });
    return response;
  } catch (err) {
    console.log('handleAPI:: verifyForgotPasswordReqeust: error: ', err);
  }
};

/**
 *
 * @param username
 * @param password
 * @returns server response
 *
 * @description
 * update password is a put request that updates the
 * user password
 */

export const updatePassword = async (username, password) => {
  const body = { username, password };
  try {
    const response = await callApi({
      path: `/user/forgotpassword`,
      method: 'PUT',
      headers: defaultHeader,
      body: body
    });
    console.log('response is', response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getCourseSpecifiedData = async (courseId) => {
  try {
    const response = await callApi({
      path: `/courses/details/${courseId}`,
      method: 'GET',
      headers: defaultHeader
    });
    return response;
  } catch (err) {
    console.log('handleAPI:: getCourseSpecifiedData: error: ', err);
  }
};

/**
 *
 * @param body
 * @returns server response on slot creation
 *
 * @description
 * a POST request on backend to create slots
 * based on date range and start time and end time
 * provided by the TA
 */
export const createSlots = async (body) => {
  try {
    const response = await callApi({
      path: '/slot',
      method: 'POST',
      headers: defaultHeader,
      body
    });
    return response;
  } catch (err) {}
};

export const getCourseTAList = async (courseID) => {
  try {
    const response = await callApi({
      path: `/courses/${courseID}/talist`,
      method: 'GET',
      headers: defaultHeader
    });
    return response;
  } catch (err) {}
};

/**
 *
 * @param id
 * @returns list of ta slots
 */
export const getTASlots = async (id) => {
  try {
    const response = await callApi<any>({
      path: `/slot?taid=${id}`,
      method: 'GET',
      headers: defaultHeader
    });
    if (response.res) {
      throw new Error('No slots available');
    }
    const tranformedSlots = tranformSlotsResponse(response);
    return tranformedSlots;
  } catch (err) {
    console.log('error is', err);
    return {};
  }
};

export const bookTASlot = async (body) => {
  try {
    const response = callApi<any>({
      path: '/slot/bookTASlot/',
      body,
      method: 'POST',
      headers: defaultHeader
    });
    return response;
  } catch (err) {
    console.log('Something went wrong');
  }
};

/**
 * Description: API call to backend at path/booking/student?id=value
 * @param userID
 * @returns student bookings with TA of all subjects
 */
export const studentManageBookings = async (userID) => {
  try {
    const studentResponse = callApi({
      path: `/booking/student?id=${userID}`,
      method: 'GET',
      headers: defaultHeader
    });
    return studentResponse;
  } catch (err) {
    console.log('API Failed for manageBookings');
  }
};

export const updateProfileDetails = async (body) => {
  try {
    const response = await callApi({
      path: `/user/profile/`,
      method: 'PUT',
      headers: defaultHeader,
      body: body
    });
    return response;
  } catch (err) {
    console.log('API Failed for Profile details updation');
  }
};

/**
 *
 * @param id
 * @returns IBookingDetails
 *
 * @description
 * GET request on backend to get booking details
 */
export const getBookingDetail = async (id) => {
  try {
    const response = await callApi<IBookingDetail>({
      path: `/booking?id=${id}`,
      method: 'GET',
      headers: defaultHeader
    });
    return response;
  } catch (err) {}
};

/**
 * Description: API call to backend at path/booking/ta?id=value
 * @param userID
 * @returns teaching assistant bookings with students
 */
export const teachingAssistantManageBookings = async (userID) => {
  try {
    const teachingAssistantResponse = callApi({
      path: `/booking/ta?id=${userID}`,
      method: 'GET',
      headers: defaultHeader
    });
    return teachingAssistantResponse;
  } catch (err) {
    console.log('API Failed for manageBookings');
  }
};
