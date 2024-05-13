import express from 'express';
import * as assignementController from '../controllers/assignmentController';
const assignmentRouter = express.Router();

/**
 * Setting route for create and get all assignments
 */
assignmentRouter
  .route('/')
  .post(assignementController.createAssignment)
  .get(assignementController.getAllAssignments);
/**
 * Setting route for create FAQ page
 */
assignmentRouter.route('/faq/').put(assignementController.createFAQ);

/**
 * Setting route for get assignments, update assignments and delete assignment based on assignment id
 */
assignmentRouter
  .route('/:id')
  .get(assignementController.getAnAssignment)
  .put(assignementController.updateAssignment)
  .delete(assignementController.deleteAssignment);

export default assignmentRouter;
