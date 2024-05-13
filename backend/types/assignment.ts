
export interface IAssignementSchema {
  courseId: Object;
  assignmentId: string;
  details: string;
  dueDate: Date;
  assignmentName: string;
  assignmentMarks: Number;
  FAQs?: Array<Object>;

}