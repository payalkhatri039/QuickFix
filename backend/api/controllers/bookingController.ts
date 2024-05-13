import { Request, Response } from 'express';
import { catchError } from '../../modules/catchError';
import {
  transformBookingArray,
  transformBookingObj
} from '../../modules/transform/transformBooking';
import * as bookingService from '../services/booking';

/**
 *
 * @param req Express.Request excepts request with id as query param
 * @param res Express.Response
 *
 * @description
 * This controller returns all the booking for a student
 */

const getStudentBookings = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response
) => {
  const { id } = req.query;
  const bookings = await bookingService.getAll({ student: id });
  const response = transformBookingArray(bookings);
  res.json(response);
  res.status(200);
};

/**
 *
 * @param req Express.Request excepts request with id as query param
 * @param res Express.Response
 *
 * @description
 * This controller returns all the booking for a TA
 */

const getTABookings = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response
) => {
  const { id } = req.query;
  const bookings = await bookingService.getAll({ ta: id });
  const response = transformBookingArray(bookings);
  res.json(response);
  res.status(200);
};

/**
 *
 * @param req Express.Request excepts request with id as query param
 * @param res Express.Response
 *
 * @description
 * This controller returns a booking deatil for requested ID.
 */
const getBookingByID = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response
) => {
  const { id } = req.query;
  const bookings = await bookingService.get(id);
  const response = transformBookingObj(bookings);
  res.json(response);
  res.status(200);
};

export default {
  getStudentBookings: catchError(getStudentBookings),
  getTABookings: catchError(getTABookings),
  getBookingByID: catchError(getBookingByID)
};
