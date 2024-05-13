import { UPDATE_USER_DETAILS } from '../actions/type';

/**
 * @param {*} state : initialState consists of upcoming and previous lists
 * @param {*} action : consists of the type and the payload
 * @returns the updated state of the TA profile details
 * TA profile details include:
 * 1. Gender/Pronoun
 * 2. Description
 * 3. LinkedIn URL
 * 4. Experience in years
 */
export interface IUser {
  email: string;
  username: string;
  userType: string;
  currentCourse: Array<string>;
  id: string;
  gender: string;
  description: string;
  linkedInURL: string;
  experience: number;
}

const initialState = {
  email: '',
  username: '',
  userType: '',
  currentCourse: [],
  gender: '',
  description: '',
  linkedInURL: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};
export default userReducer;
