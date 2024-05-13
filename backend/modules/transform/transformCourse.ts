import { ICoursesSchema } from '../../types/courses';
import { ICoursesUserSchema } from '../../types/coursesUser';

export const transformCourseObj = (
  course: ICoursesSchema,
  user: ICoursesUserSchema
) => {
  const { courseId, courseName, currentAssignment, description, assignments } =
    course;
  const { professorId, studentId, teachingAssistantId } = user;
  return {
    courseId,
    courseName,
    currentAssignment,
    description,
    assignments,
    professor: professorId,
    student: studentId,
    tas: teachingAssistantId
  };
};

export const getTransformedTAList = (user) => {
  const { teachingAssistantId: taList = [] } = user || {};
  const transformedList = [];
  taList.forEach((ta) => {
    const { firstName, lastName, username, email, _id: id } = ta;
    transformedList.push({
      firstName,
      lastName,
      username,
      email,
      id
    });
  });
  return transformedList;
};
