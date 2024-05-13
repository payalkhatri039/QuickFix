import { ObjectId } from 'mongoose';
import { ICoursesSchema } from './courses';
import { ISlot } from './teachingAssistantSlots';
import { IUser, IUserSchema } from './user';
export interface IBookingSchema {
  student: ObjectId;
  ta: ObjectId;
  course: ObjectId;
  slot: ObjectId;
}

type BookingSchemaKey = keyof IBookingSchema | '_id';

export type IBookingGetBy = {
  [key in BookingSchemaKey]?: string;
};

export interface IBookingDetail {
  student: IUserSchema;
  ta: IUserSchema;
  course: ICoursesSchema;
  slot: ISlot;
}
