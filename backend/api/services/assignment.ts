import { IAssignementSchema } from '../../types/assignment';
import Assignment from '../models/assignment';

/**
 *
 * @param assignmentId
 * @returns new created assignment
 */
export const save = (assignmentId: String) => {
  const newAssignment = new Assignment(assignmentId);
  return newAssignment.save();
};

/**
 *
 * @param assignmentId
 * @returns a single required assignment
 */
export const get = (assignmentId) => {
  const assignment = Assignment.findById(assignmentId).exec();
  return assignment;
};

/**
 *
 * @param assignment
 * @returns updated assignment
 */
export const update = (assignment) => {
  const updatedAssignment = Assignment.findByIdAndUpdate(
    assignment.id,
    assignment
  ).exec();
  return updatedAssignment;
};

/**
 *
 * @param id
 * @returns deletes an assignment
 */
export const remove = (id) => {
  const assignment = Assignment.findByIdAndDelete(id).exec();
  return assignment;
};

/**
 *
 * @returns found required assignment
 */
export const find = () => {
  const assignment = Assignment.find();
  return assignment;
};

/**
 *
 * @param id
 * @param faq
 * @returns updated assignment with faq
 */
export const updateFaq = (id, faq) => {
  const updatedAssignment = Assignment.findOneAndUpdate(id, faq, {
    new: true
  }).exec();
  return updatedAssignment;
};
