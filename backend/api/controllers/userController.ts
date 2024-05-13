import { Request, Response } from 'express';
import {
  createJwtToken,
  getForgotPasswordToken,
  hashPassword
} from '../../modules/auth/auth';
import { catchError } from '../../modules/catchError';
import EmailModule from '../../modules/auth/email';
import { transformUserObj } from '../../modules/transform/tranformUser';
import {
  IReqeustUserForgotPassword,
  IUser,
  IRequestUser,
  IRequestUserSignIn
} from '../../types/user';
import * as userService from '../services/user';
import * as controllerHelper from '../../modules/ControllerHelper';

/**
 *
 * @param req <IRequestUserSignIn> user provided username and passoword
 * @param res <IUserSchema> Expresss res obj
 *
 * @description
 * This request authenticates user based on username and password
 * and return a valid JWT Token.
 */

const authenticateUser = async (
  req: Request<{}, {}, IRequestUserSignIn>,
  res: Response
) => {
  const body = req.body;
  try {
    const user = await userService.authenticateUser(body);
    const jwtToken = createJwtToken(user);
    const transformedResponse = transformUserObj(user, jwtToken);
    res.cookie('token', jwtToken);
    res.json(transformedResponse);
    res.status(200);
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param req <IRequestUser> user provided username and password
 * @param res Express res obj
 * This reqeust creates new user and saves hash password in db for security reasons
 * and returns a valid JWT token
 */

const createNewUser = async (
  req: Request<{}, {}, IRequestUser>,
  res: Response
) => {
  try {
    const user: IRequestUser = req.body;
    console.log('user is', user);
    user.password = await hashPassword(user.password);
    const savedUser = await userService.createNewUser(user);
    const token = await createJwtToken(savedUser);
    const response = transformUserObj(savedUser, token);
    const emailModule = new EmailModule(response.email);
    emailModule.sendSignUpMail();
    res.cookie('token', token);
    res.json(response);
    res.status(200);
    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 *
 * @param req IReqeustUserForgotPassword username and email
 * @param res Express Response obj
 *
 * @description
 * This method first validates if the username and email are valid.
 * If the request is valid a jwt token is created with email and username
 * and a email is triggered with createNewPassword link specific to the user.
 */

const createPasswordToken = async (
  req: Request<{}, {}, IReqeustUserForgotPassword>,
  res: Response
) => {
  try {
    const reqeustBody: IReqeustUserForgotPassword = req.body;
    const token = await userService.getForgotPasswordToken(reqeustBody);
    const emailModule = new EmailModule(reqeustBody.email);
    emailModule.sendForgotPasswordMail(token);
    res.json({
      token
    });
    res.status(200);
    return;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param req QueryParam has jwt token
 * @param res Express response
 *
 * @description
 * This request checks if the token after landing on change password
 * is valid or not. If the token is valid then only user will be able
 * to change the password.
 */

const verifyForgotPasswordToken = async (
  req: Request<{}, {}, {}, { token: string }>,
  res: Response
) => {
  try {
    const token = req.query.token;
    const userRequestObj = getForgotPasswordToken(token);
    let response: any = {};
    try {
      const userDetails = await userService.getUser(userRequestObj);
      response = {
        username: userDetails.username,
        verified: true
      };
    } catch (err) {
      response.verified = false;
      response.username = '';
    }

    res.status(200);
    res.json(response);
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param req Express.Request<{},{},IRequestUser> should have username and new password
 * @param res Express.Response
 *
 * This method updates the user password.
 */

const changePassword = async (
  req: Request<{}, {}, IRequestUser>,
  res: Response
) => {
  try {
    const user = req.body;
    user.password = await hashPassword(user.password);
    const updatedUser = await userService.updateUser(user);
    const response = transformUserObj(updatedUser);
    res.json(response);
    res.status(200);
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param req Express.Reqeust
 * @param res Express.Response returns user courses
 *
 * This method takes user id and returns all the course assigned to him.
 */

const getUserCourses = async (req: Request, res: Response) => {
  try {
    const userid = req.params.id;
    const courseUserDetails = await userService.getCourseByUserId(userid);
    res.json(courseUserDetails);
    res.status(200);
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param req Express.Reqeust Expects IRequestUser in body
 * @param res Express.Response
 *
 * This methods updates the user profile
 */

const updateUserProfile = async (
  req: Request<{}, {}, IRequestUser>,
  res: Response
) => {
  try {
    const user = req.body;
    const updatedUser = await userService.updateUser(user);
    const response = transformUserObj(updatedUser);
    res.json(response);
    res.status(200);
  } catch (err) {
    throw err;
  }
};

export default {
  createNewUser: catchError(createNewUser),
  authenticateUser: catchError(authenticateUser),
  createPasswordToken: catchError(createPasswordToken),
  verifyForgotPasswordToken: catchError(verifyForgotPasswordToken),
  changePassword: catchError(changePassword),
  getUserCourses: catchError(getUserCourses),
  updateUserProfile: catchError(updateUserProfile)
};
