import QuickFixError from '../../modules/error';
import { INVALID_PARAMS, NO_ENTRY_FOUND } from '../../modules/errorConstant';
import { IBookingGetBy, IBookingSchema } from '../../types/booking';
import BookingModel from '../models/Booking';

/**
 *
 * @param {IBookingSchema} booking
 * @returns {Promise<IBookingSchema>}
 * creates a new booking object in the database
 */
export const save = async (
  booking: IBookingSchema
): Promise<IBookingSchema> => {
  try {
    const bookingObj = new BookingModel(booking);
    const savedBookingData = await bookingObj.save();
    return savedBookingData;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {string} id
 * @returns {IBookingSchema}
 *
 * @description
 * Returns the booking detail assosiated with a id
 */

export const get = async (id: string) => {
  try {
    const booking = await BookingModel.findOne({ _id: id }).populate(
      'student ta course slot'
    );
    if (booking == null) {
      throw new QuickFixError({ clientMsg: NO_ENTRY_FOUND });
    }
    return booking;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {IBookingGetBy} getBy
 * @returns {Array<IBookingSchema>}
 *
 * @description
 * this fucntion returns the complete list of bookings
 * associated with the filter by provided by the user
 */

export const getAll = async (getBy: IBookingGetBy) => {
  try {
    const bookings = await BookingModel.find(getBy).populate(
      'student ta course slot'
    );
    return bookings;
  } catch (err) {
    throw err;
  }
};
