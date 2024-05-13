import mongoose from 'mongoose';
import { IBookingSchema } from '../../types/booking';

const BookingSchema = new mongoose.Schema<IBookingSchema>({
  student: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  ta: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Types.ObjectId, ref: 'Courses', required: true },
  slot: { type: mongoose.Types.ObjectId, ref: 'TASlots', required: true }
});

const model = mongoose.model('Booking', BookingSchema);

export default model;
