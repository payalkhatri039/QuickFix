import {
  comparePassword,
  createForgotPasswordToken
} from '../../modules/auth/auth';
import QuickFixError from '../../modules/error';
import { INVALID_PARAMS, USER_NOT_FOUND } from '../../modules/errorConstant';
import {
  IReqeustUserForgotPassword,
  IRequestUser,
  IRequestUserSignIn,
  IUserSchema
} from '../../types/user';
import * as courseService from './course';
import * as courseUserService from './courseUser';
import User from '../models/User';
import { getRandomInt } from '../../modules/ControllerHelper';
import userModel from './../models/User';

/**
 *
 * @param id userID
 * @returns Promise<IUserSchema>
 *
 * @description
 * This function takes userID and return user details
 * if the user exists in user db and throws a Quickfix error(Caught Expection)
 * if user does not exist.
 */
export const getUserByID = async (id: string): Promise<IUserSchema> => {
  try {
    const userObj = await User.findOne({ _id: id });
    if (!userObj) {
      throw new QuickFixError({ clientMsg: USER_NOT_FOUND });
    }
    return userObj;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param user BaseUser
 * @returns Promise<IUserSchema>
 *
 * @description
 * This function takes username and return user details
 * if the user exists in user db and throws a Quickfix error(Caught Expection)
 * if user does not exist.
 */

export const getUser = async (user: BaseUser): Promise<IUserSchema> => {
  try {
    const userObj = await User.findOne({ username: user.username });
    if (!userObj) {
      throw new QuickFixError({ clientMsg: INVALID_PARAMS });
    }
    return userObj;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param user
 * @returns Promise<IUserSchema>
 *
 * @description
 * Creates a new user and assigns a new course randomly (for demo purpsose)
 * and updates the courseUser table.
 */

export const createNewUser = async (
  user: IRequestUser
): Promise<IUserSchema> => {
  try {
    const coursesArray = await courseService.getAllCourses();
    const index = getRandomInt(coursesArray.length - 1);
    if (user.userType !== 'PROF') {
      if (user.currentCourses == undefined) user.currentCourses = [];
      user.currentCourses.push(coursesArray[index]._id.toString());
    }

    const userObj = new User(user);
    const savedUser = await userObj.save();
    if (user.userType !== 'PROF') {
      try {
        const userObj = {
          studentId: savedUser._id.toString()
        };
        await courseUserService.addUser(
          coursesArray[index]._id.toString(),
          userObj
        );
      } catch (err) {
        console.log(err);
      }
    }

    return savedUser;
  } catch (err) {
    if (err.keyValue) {
      throw new QuickFixError({
        clientMsg: `${Object.keys(err.keyValue)[0]} already exists`
      });
    }
    throw err;
  }
};

/**
 *
 * @param user IRequestUserSignIn
 * @returns Promise<IUserSchema>
 *
 * @description
 * This function first finds user based of username and
 * if the user exists then it compare the hashed password
 * stored in the db with the password provided by user.
 * If both conditions are satisfied it means user id genuine
 * else throw a QuickFixError (caught exception) with invalid credentials
 */

export const authenticateUser = async (
  user: IRequestUserSignIn
): Promise<IUserSchema> => {
  try {
    const userObj = await getUser(user);
    const isValid = await comparePassword(user.password, userObj.password);
    if (isValid) {
      return userObj;
    } else {
      throw new QuickFixError({ clientMsg: INVALID_PARAMS });
    }
  } catch (err) {
    console.log('Error is', err);
    throw err;
  }
};

/**
 *
 * @param user
 * @returns Promise<IUserSchema>
 *
 * @description
 * This function first finds the user based of username
 * and updates the user if it exists.
 */

export const updateUser = async (user: IRequestUser): Promise<IUserSchema> => {
  try {
    const { username, ...others } = user;
    const filter = { username };
    const updateDoc = {
      $set: {
        ...others
      }
    };
    const updatedUser = await User.findOneAndUpdate(filter, updateDoc, {
      new: true
    });
    if (updatedUser === null) {
      throw new QuickFixError({
        clientMsg: INVALID_PARAMS
      });
    }
    return updatedUser;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param user
 * @returns {Promise<string>}
 *
 * @description
 * This function first verifies if the username and email provided
 * are valid. If the credentials are valid then only a JWT token is
 * created else a caught exception is thrown.
 */

export const getForgotPasswordToken = async (
  user: IReqeustUserForgotPassword
): Promise<string> => {
  try {
    const userObj = await getUser(user);
    let token: string;
    if (user.email === userObj.email) {
      token = createForgotPasswordToken(userObj);
    } else {
      throw new QuickFixError({ clientMsg: INVALID_PARAMS });
    }
    console.log('token is', token);
    return token;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param userId
 * This function returns all the courses user is enrolled in
 */

export const getCourseByUserId = async (userId) => {
  try {
    const courseData = await userModel
      .findOne({ _id: userId })
      .populate('currentCourses')
      .exec();
    console.log(courseData);
    return courseData;
  } catch (err) {
    throw new QuickFixError({ clientMsg: 'Unable to fetch course details' });
  }
};

type BaseUser = {
  username: string;
};
