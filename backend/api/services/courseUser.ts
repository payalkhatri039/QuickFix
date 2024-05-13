import { IAddUserObject, ICoursesUserSchema } from '../../types/coursesUser';
import courseUserModel from './../models/CourseUsers';
import courseModel from './../models/Courses';

/**
 *
 * @param course
 * @returns Promise<ICoursesUserSchema>
 *
 * @description
 * This function creates and saves a new courseUserId
 */
export const save = (course: ICoursesUserSchema) => {
  const courseItem = new courseUserModel(course);
  return courseItem.save();
};

/**
 *
 * @param courseId
 * @returns Promise<ICoursesUserSchema>
 *
 * @description
 * This function finds a single courseUser with an id
 */
export const getByCourseId = (courseId: String) => {
  const courseItem = courseUserModel.findById(courseId).exec();
  return courseItem;
};

/**
 *
 * @description
 * This function retrieve all courses user
 */
export const getAllUsers = () => {
  const courseItem = courseUserModel.find();
  return courseItem;
};

/**
 *
 * @param updatedCourseitem
 * @returns Promise<ICoursesUserSchema>
 *
 * @description
 * This function updates a courseUser by the id in the request
 */
export const update = (updatedCourseitem) => {
  const courseItem = courseUserModel
    .findByIdAndUpdate(updatedCourseitem.id, updatedCourseitem)
    .exec();
  return courseItem;
};

/**
 *
 * @param id
 * @param userObj
 * @returns Promise<ICoursesUserSchema>
 *
 * @description
 * This function updates the course details according to the courseId
 */
export const addUser = async (id: string, userObj: IAddUserObject) => {
  try {
    const pushObj = {};
    for (let key in userObj) {
      pushObj[key] = userObj[key];
    }
    const push = {
      $push: pushObj
    };
    const response = await courseUserModel.updateOne({ courseId: id }, push);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 *
 * @param id
 * @returns Promise<ICoursesUserSchema>
 *
 * @description
 * This function returns the course according to the TA logged in
 */
export const getCourseFromTaID = async (id: string) => {
  try {
    const course = await courseUserModel
      .findOne({ teachingAssistantId: id })
      .populate('studentId');
    console.log('Course is', course.courseId);
    return course;
  } catch (err) {
    console.log('error is', err);
  }
};

/**
 *
 * @param teachingAssistantId
 * @returns Promise<ICoursesUserSchema>
 *
 * @description
 * This function gives assignments according to the TA id logged in
 */
export const getByTAId = async (teachingAssistantId: String) => {
  const courseDetail = await courseUserModel.findOne({
    teachingAssistantId: teachingAssistantId
  });
  const courseId = courseDetail.courseId;

  const assignmentList = await (
    await courseModel.findOne({ _id: courseId }).populate('assignments')
  ).assignments;

  return assignmentList;
};

/**
 * @description
 * This function gives an on going assignment id according to the TA logged in
 */
export const getOngoingAssignmentIdByTAId = async (
  teachingAssistantId: String
) => {
  const courseDetail = await courseUserModel.findOne({
    teachingAssistantId: teachingAssistantId
  });
  const courseId = courseDetail.courseId;

  const currentAssignment = (await courseModel.findOne({ _id: courseId }))
    .currentAssignment;

  return { currentAssignment };
};
