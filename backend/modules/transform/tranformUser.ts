import { IUserSchema } from '../../types/user';

export const transformUserObj = (user: IUserSchema, jwtToken: string = '') => {
  const {
    email,
    firstName,
    lastName,
    id,
    userType,
    username,
    description,
    experience,
    gender,
    linkedInURL
  } = user;
  return {
    email,
    firstName,
    lastName,
    id,
    userType,
    username,
    token: jwtToken,
    linkedInURL,
    experience,
    gender,
    description
  };
};
