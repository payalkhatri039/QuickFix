import { Router } from 'express';
import bookingController from '../controllers/bookingController';
const bookingRouter = Router();

bookingRouter.route('/').get(bookingController.getBookingByID);
bookingRouter.route('/student').get(bookingController.getStudentBookings);
bookingRouter.route('/ta').get(bookingController.getTABookings);
export default bookingRouter;
