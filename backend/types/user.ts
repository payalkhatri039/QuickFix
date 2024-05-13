export interface IBaseUser {
  id: string;
  username: string;
}

export interface IUser extends IBaseUser {
  email: string;
  firstName: string;
  lastName: string;
  currentCourses?: Array<string>;
  userType: TUserType;
  gender?: string;
  description?: string;
  linkedInURL?: string;
  experience?: number;
}

export interface IUserSchema extends IUser {
  password: string;
}

export interface IRequestUser {
  email: string;
  firstName: string;
  lastName: string;
  userType: TUserType;
  currentCourses?: Array<string>;
  password: string;
  username: string;
}

export interface IRequestUserSignIn {
  password: string;
  username: string;
}

export interface IReqeustUserForgotPassword {
  username: string;
  email: string;
}

export interface IUserForgotPasswordTokenObj
  extends IReqeustUserForgotPassword {
  ttl: number;
}

export type TUserType = 'PROF' | 'STUDENT' | 'STUDENT_TA' | 'ALUMINI';
