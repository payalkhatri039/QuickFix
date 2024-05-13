export interface ICoursesUserSchema {
  courseId: Object;
  professorId: Object;
  studentId?: Array<Object>;
  teachingAssistantId?: Array<Object>;
}

type CourseUserType = keyof ICoursesUserSchema;
export type IAddUserObject = {
  [key in CourseUserType]?: string;
};
