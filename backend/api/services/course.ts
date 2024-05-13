import QuickFixError from '../../modules/error';
import courseModel from './../models/Courses';
import courseUsersModel from './../models/CourseUsers';

/**
 *
 * @param course
 * @returns Promise<ICoursesSchema>
 *
 * @description
 * This function takes create and save a new course
 */
export const save = (course) => {
  const courseItem = new courseModel(course);
  return courseItem.save();
};

/**
 *
 * @param courseId
 * @returns Promise<ICoursesSchema>
 *
 * @description
 * This function finds a single course with an id and give details of the course
 */
export const getById = (courseId: String) => {
  const courseItem = courseModel.findById(courseId).exec();
  return courseItem;
};

/**
 * @description
 * This function retrieves all courses he/she is enrolled in for the user who is logged in
 */

export const getAllCourses = () => {
  const courseItem = courseModel.find();
  return courseItem;
};

/**
 *
 * @param updatedCourseitem
 * @returns Promise<ICoursesSchema>
 *
 * @description
 * This function updates a course details according the id being passed
 */
export const update = (updatedCourseitem) => {
  const courseItem = courseModel
    .findByIdAndUpdate(updatedCourseitem.id, updatedCourseitem)
    .exec();
  return courseItem;
};

/**
 *
 * @param courseId
 * @returns Promise<ICoursesSchema>
 *
 * @description
 * This function gives details of the students who is studying the course
 */
export const getCourseUserDetail = async (courseId) => {
  try {
    const userData = await courseUsersModel
      .findOne({ courseId: courseId })
      .populate('professorId studentId teachingAssistantId')
      .exec();
    return userData;
  } catch (err) {
    throw new QuickFixError({
      clientMsg: 'Unable to fetch details',
      message: 'Unable to fetch details'
    });
  }
};

/**
 *
 * @param courseId
 * @returns Promise<ICoursesSchema>
 *
 * @description
 * This function gives details of the students who is studying the course
 */
export const getDetails = async (courseId) => {
  try {
    const data = await courseModel
      .findOne({ _id: courseId })
      .populate('assignments currentAssignment')
      .exec();

    const userData = await getCourseUserDetail(courseId);
    return {
      courseData: data,
      courseUserData: userData
    };
  } catch (err) {
    throw new QuickFixError({ clientMsg: 'Unable to fetch list' });
  }
};
