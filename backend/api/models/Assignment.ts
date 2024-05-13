import mongoose from 'mongoose';
import { IAssignementSchema } from '../../types/assignment';
/**
 * Creating assignment schema with following details:
 *1. Course Id: reference from Courses table
 *2. Assignment Id: To be unique for each assignment
 *3. Assignment Details: Description of the assignment
 *4. DueDate: Last date of assignment submission
 *5. AssignmentName: Name of the assignment
 *6. AssignmentMarks: Marks of the assignment
 *7. FAQs: Contains id, question, answer and description for each assignment
 */
const AssignmentSchema = new mongoose.Schema<IAssignementSchema>({
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: 'Course'
  },

  assignmentId: {
    type: String,
    required: true,
    unique: true
  },

  details: {
    type: String,
    required: [true, 'Please add assignement details']
  },

  dueDate: {
    type: Date,
    required: [true, 'Please add due date.']
  },

  assignmentName: {
    type: String,
    required: [true, 'Please add assignment name.']
  },

  assignmentMarks: {
    type: Number,
    required: [true, 'Please add assigment marks']
  },

  FAQs: [
    {
      id: String,
      ques: String,
      ans: String,
      description: String
    }
  ]
});

const model = mongoose.model('Assignment', AssignmentSchema);

export default model;
