import { Request, Response } from 'express';
import * as Assignment_service from './../services/assignment';

/**
 *
 * @param obj
 * @param response : Setting response when successful - Status 200
 */
const setResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

/**
 *
 * @param error
 * @param response : Setting response when there's server error - Status 500
 */
const setError = (err, response) => {
  response.status(500);
  response.json(err);
};

//
/**
 *
 * @param error
 * @param response Setting response when there's file not found error - Status 404
 */
const setClientError = (err, response) => {
  response.status(400);
  response.json(err);
};

/**
 *
 * @param {Express.Request} request - to get all assignments
 * @param {Express.Response} response - to get all assignments
 */
export const getAllAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment_service.find();
    setResponse(assignments, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 *
 * @param request - to get an assignment based on assignment id
 * @param response - sending an assignment based on assignment id
 */
export const getAnAssignment = async (req: Request, res: Response) => {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignment_service.get(assignmentId);
    setResponse(assignment, res);
  } catch (error) {
    setClientError(error, res);
  }
};

/**
 *
 * @param request - Sending details to create assignment
 * @param response - Creating assignments
 */
export const createAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = req.body;
    const savedAssignment = await Assignment_service.save(assignment);
    setResponse(savedAssignment, res);
  } catch (error) {
    setClientError(error, res);
  }
};

/**
 *
 * @param request - sending details to update assignment
 * @param response - updating assignment
 */
export const updateAssignment = async (req: Request, res: Response) => {
  try {
    const assignmentId = req.params.id;
    const assignment = {
      ...req.body
    };
    assignment.id = assignmentId;
    const updatedAssignment = await Assignment_service.update(assignment);
    setResponse(updatedAssignment, res);
  } catch (error) {
    setClientError(error, res);
  }
};

/**
 *
 * @param request - sending detials to delete assignment
 * @param response - deleting an assignment based on assignment id
 */
export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const assignmentId = req.params.assignmentId;
    const assignment = await Assignment_service.remove(assignmentId);
    setResponse(
      {
        message: 'Successfully removed'
      },
      res
    );
  } catch (error) {
    setClientError(error, res);
  }
};

/**
 *
 * @param request - sending all details of FAQ for FAQ creation
 * @param response - creating a FAQ
 */
export const createFAQ = async (req: Request, res: Response) => {
  try {
    const faq = req.body.FAQs;
    const assignmentId = req.body.id;
    console.log('Hiii inside faq');
    const savedAssignment = await Assignment_service.updateFaq(
      {
        _id: assignmentId
      },
      {
        $push: {
          FAQs: faq
        }
      }
    );
    setResponse(savedAssignment, res);
  } catch (error) {
    setClientError(error, res);
  }
};
