import { IBookingDetail } from '../../types/booking';
import { transformUserObj } from './tranformUser';

export const transformBookingArray = (bookingArray) => {
  const currentDate = new Date();
  console.log('booking array is', bookingArray);
  const upcomingBookings = bookingArray.filter(
    (obj) => obj.slot.day >= currentDate
  );
  const previousBookings = bookingArray.filter(
    (obj) => obj.slot.day < currentDate
  );
  const upcoming = getTranformedBookingArray(upcomingBookings);
  const previous = getTranformedBookingArray(previousBookings);
  return {
    upcoming,
    previous
  };
};

export const transformBookingObj = (booking) => {
  const student = transformUserObj(booking.student);
  const ta = transformUserObj(booking.ta);
  const course = booking.course.courseName;
  const { day, endTime, startTime } = booking.slot;
  const id = booking._id;
  return {
    student,
    course,
    ta,
    slot: { day, endTime, startTime },
    id
  };
};

const getTranformedBookingArray = (bookings) => {
  const updatedBookings = bookings.map((booking) =>
    transformBookingObj(booking)
  );
  return updatedBookings;
};
