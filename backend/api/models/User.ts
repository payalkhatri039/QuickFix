import mongoose from 'mongoose';
import { IUserSchema } from '../../types/user';
/**
 * Creating users schema with the following details:
 * 1. Email
 * 2. Username
 * 3. Password
 * 4. User type
 * 5. Current courses
 * 6. First Name
 * 7. Last Name
 * 8. Gender
 * 9. Description
 * 10. LinkedIn URL
 * 11.Experience
 */
const UserSchema = new mongoose.Schema<IUserSchema>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: [true, 'Please add a userName.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password.']
  },
  userType: {
    type: String,
    required: [true, 'Please Select a Type']
  },
  currentCourses: [{ type: mongoose.Types.ObjectId, ref: 'Courses' }],
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  description: {
    type: String
  },
  linkedInURL: {
    type: String
  },
  experience: {
    type: Number
  }
});

const model = mongoose.model('User', UserSchema);

export default model;
