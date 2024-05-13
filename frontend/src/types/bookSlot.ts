export interface User {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  userType: string;
  username: string;
  token?: string;
}

export interface Slot {
  day: Date;
  endTime: string;
  startTime: string;
}

export interface IBookingDetail {
  student: User;
  course: string;
  ta: User;
  slot: Slot;
  id: string;
}
