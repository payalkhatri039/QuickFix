/**
 * getSlots response interface
 */
export interface ISlotsResponse {
  structuredTASlots: ISlots;
}

export interface ISlots {
  [key: string]: Array<ISlot>;
}

export interface ISlot {
  day: Date;
  endTime: string;
  isBooked: boolean;
  startTime: string;
  _id: string;
}
