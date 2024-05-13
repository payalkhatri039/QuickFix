import mongoose from 'mongoose';
import { ICoursesSchema } from '../../types/courses';

//adding Course Schema
const CourseSchema = new mongoose.Schema<ICoursesSchema>({
  courseId: {
    type: String,
    required: [true, 'Please add a courseId.'],
    unique: true
  },
  courseName: {
    type: String,
    required: [true, 'Please add a courseName.']
  },
  assignments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Assignment'
    }
  ],
  currentAssignment: {
    type: mongoose.Types.ObjectId,
    ref: 'Assignment',
  },
  description: {
    type: String,
    required: [true, 'Please add a description.']
  }
});

const model = mongoose.model('Courses', CourseSchema);

export default model;
