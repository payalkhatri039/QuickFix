import { Request, Response } from 'express';
import * as courseUserservice from '../services/courseUser';
import * as controllerHelper from '../../modules/ControllerHelper';

/**
 *
 * @param req Express.Request
 * @param res Express.Response
 *
 * @description
 * api for get all course users data from database
 */

export const getAllCourseUsers = async (req: Request, res: Response) => {
  try {
    const courseItem = await courseUserservice.getAllUsers();
    controllerHelper.setResponse(courseItem, res);
  } catch (error) {
    controllerHelper.setError(error, res);
  }
};

/**
 *
 * @param req Express.Request excepts request with id as query param
 * @param res Express.Response
 *
 * @description
 * api to get all users who are associated with same courseId from database
 */

export const getAllUsersOfCourseById = async (req: Request, res: Response) => {
  try {
    const courseitemId = req.params.id;
    const courseItem = await courseUserservice.getByCourseId(courseitemId);
    controllerHelper.setResponse(courseItem, res);
  } catch (error) {
    controllerHelper.setError(error, res);
  }
};

/**
 *
 * @param req
 * @param res
 *
 * @description
 * api for Inserting data of course users to database
 */

export const createAllCourseUsers = async (req: Request, res: Response) => {
  try {
    const courseItem = req.body;
    const savedCourseitem = await courseUserservice.save(courseItem);
    controllerHelper.setResponse(savedCourseitem, res);
  } catch (error) {
    controllerHelper.setError(error, res);
  }
};

/**
 *
 * @param req Express.Request excepts request with id as query param
 * @param res Express.Response
 *
 * @description
 * api to update data of course users to database
 */

export const updateCourseUsers = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updated = { ...req.body };
    updated.id = id;
    const updatedCourse = await courseUserservice.update(updated);
    controllerHelper.setResponse(updatedCourse, res);
  } catch (error) {
    controllerHelper.setError(error, res);
  }
};

/**
 *
 * @param req Express.Request excepts request with id as query param
 * @param res Express.Response
 *
 * @description
 * api to get all assignments who are associated with same TA id from database
 */
export const getAllAssignmentsAccordingToTA = async (
  req: Request,
  res: Response
) => {
  try {
    const taId = req.params.id;
    const assignmentList = await courseUserservice.getByTAId(taId);
    controllerHelper.setResponse(assignmentList, res);
  } catch (error) {
    controllerHelper.setError(error, res);
  }
};

/**
 *
 * @param req Express.Request excepts request with id as query param
 * @param res Express.Response
 *
 * @description
 * api to get on going assignment according to the TA logged in
 */
export const getOnGoingAssignmentId = async (req: Request, res: Response) => {
  try {
    const taId = req.params.id;
    const OnGoingAssignmentId =
      await courseUserservice.getOngoingAssignmentIdByTAId(taId);
    controllerHelper.setResponse(OnGoingAssignmentId, res);
  } catch (error) {
    controllerHelper.setError(error, res);
  }
};
