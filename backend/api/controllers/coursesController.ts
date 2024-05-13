import { Request, Response } from 'express';
import * as courseService from './../services/course';
import * as controllerHelper from '../../modules/ControllerHelper';
import courseModel from './../models/Courses';
import courseUsersModel from './../models/CourseUsers';
import {
  getTransformedTAList,
  transformCourseObj
} from '../../modules/transform/transformCourse';

/**
 *
 * @param req Express.Request
 * @param res Express.Response
 *
 * @description
 * api to get all course data from database
 */

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courseItem = await courseService.getAllCourses();
    controllerHelper.setResponse(courseItem, res);
  } catch (error) {
    console.log('error');
    controllerHelper.setError(error, res);
  }
};

/**
 *
 * @param req Express.Request excepts request with id as query param
 * @param res Express.Response
 *
 * @description
 * api to get all data of particular courseId from database
 */

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const courseitemId = req.params.id;
    const courseItem = await courseService.getById(courseitemId);
    controllerHelper.setResponse(courseItem, res);
  } catch (error) {
    controllerHelper.setError(error, res);
  }
};

/**
 *
 * @param req Express.Request
 * @param res Express.Response
 *
 * @description
 * api to insert data of course to database
 */

export const createNewCourse = async (req: Request, res: Response) => {
  try {
    const courseItem = req.body;
    const savedCourseitem = await courseService.save(courseItem);
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
 * api to update data of courses by courseId to database
 */

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updated = { ...req.body };
    updated.id = id;
    const updatedCourse = await courseService.update(updated);
    controllerHelper.setResponse(updateCourse, res);
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
 * api to get all details of course by transforming and populating data
 */

export const getAllDetailsOfCourseById = async (
  req: Request,
  res: Response
) => {
  try {
    const courseitemId = req.params.id;
    const { courseData, courseUserData } = await courseService.getDetails(
      courseitemId
    );
    const responseData = transformCourseObj(courseData, courseUserData);
    controllerHelper.setResponse(responseData, res);
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
 * api to get TA list according to the course
 */
export const getCourseTAList = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const courseId = req.params.id;
    console.log('course controller crdID', courseId);
    const courseUserDetails = await courseService.getCourseUserDetail(courseId);
    console.log('course controller details', courseUserDetails);
    const taList = getTransformedTAList(courseUserDetails);
    const response = {
      taList
    };
    controllerHelper.setResponse(response, res);
  } catch (err) {
    console.log('Error while fetching tas', err);
    controllerHelper.setError(err, res);
  }
};
