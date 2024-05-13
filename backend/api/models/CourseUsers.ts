import mongoose from 'mongoose';
import { ICoursesUserSchema } from '../../types/coursesUser';

//adding Courses User Schema
const CoursesUserSchema = new mongoose.Schema<ICoursesUserSchema>({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'Courses'
    },
    professorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    studentId: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    teachingAssistantId: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
});

const model = mongoose.model('CourseUser', CoursesUserSchema);

export default model;
