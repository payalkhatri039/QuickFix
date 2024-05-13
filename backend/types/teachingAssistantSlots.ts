export interface ITASlotSchema {
  teachingAssistantId: Object;
  availableSlots: Array<IAvailableSlotObj>;
}

export interface IAvailableSlotObj {
  slots: Array<ISlot>;
}

export interface ISlot {
  teachingAssistantId: Object;
  day: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface IBookedSlot extends ISlot {
  _Id: number;
}
