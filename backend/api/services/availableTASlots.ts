import TASlotModel from '../../api/models/TASlots';
import TASlotAvailabityModel from '../../api/models/TAAvailability';
import {
  IAvailableSlotObj,
  IBookedSlot,
  ISlot
} from '../../types/teachingAssistantSlots';

/**
 * Description: saves all the slots according to
 * the duration set (15min) to Database
 * @param TASlots
 * @returns - the slots saved in the database
 */
export const saveSlots = async (TASlots: ISlot[]) => {
  const savedTASlots = await TASlotModel.insertMany(TASlots);
  return savedTASlots;
};

/**
 * Description : Filters the slots of the specific TA and returns them
 * @param teachingAssistantId : the TA whose slots are required
 * @returns filtered TA's slots
 */
export const getTASlots = async (teachingAssistantId) => {
  const filter = { teachingAssistantId: teachingAssistantId };
  const taSlotsFromDB = await TASlotModel.find(filter);
  return taSlotsFromDB;
};

/**
 * Description : Mark the TA slot booked for the given booking ID
 * @param bookingSlotID
 * @returns updated list of slots with the booked one as unavailable
 */
export const bookTASlots = async (bookingSlotID: String) => {
  const filter = { _id: bookingSlotID };
  const update = { isBooked: true };
  const updatedSlotEntry = await TASlotModel.findOneAndUpdate(filter, update, {
    new: true
  });
  return updatedSlotEntry;
};
