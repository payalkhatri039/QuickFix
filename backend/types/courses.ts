export interface ICourses {
  courseId: string;
  userId: string;
}

export interface ICoursesSchema extends ICourses {
  courseName: string;
  assignments?: Array<Object>;
  currentAssignment: Object;
  description: string;
}

