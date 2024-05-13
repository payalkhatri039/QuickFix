import React, { useEffect, useState } from 'react';
import '../../styles/ManageBookings/ManageBookings.scss';
import { Table, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

/**
 * @returns the previous bookings of student/TA in table format
 */
export default function PreviousBookings() {
  // Retrieves the previous bookings list from redux - store : bookingsReducer
  const PreviousBookings = useSelector(
    (state: RootState) => state.bookings.previous
  );
  // state to manage the bookings entries and pass to table
  const [bookings, setBookings] = useState([]);

  /**
   * Iterates the previousBookings list to modify entries and data where each
   * object structure is -
   * { key:value,
   *  nameTA:value,
   *  nameStudent:value,
   *  subject:value,
   *  Time:value }
   * bookingMap consists of the updated list - passed to setBookings
   */
  useEffect(() => {
    const bookingMap = PreviousBookings.map((eachBooking, counter) => {
      let eachBookingEntry = {
        key: counter,
        nameTA: eachBooking.ta.firstName + ' ' + eachBooking.ta.lastName,
        nameStudent:
          eachBooking.student.firstName + ' ' + eachBooking.student.lastName,
        subject: eachBooking.course,
        Time:
          eachBooking.slot.day.split('T')[0] +
          ',' +
          ' ' +
          eachBooking.slot.startTime +
          ' - ' +
          eachBooking.slot.endTime
      };
      return eachBookingEntry;
    });

    setBookings(bookingMap);
  }, [PreviousBookings]);

  // Defines the structure of the table for previousBookings
  interface DataType {
    key: React.Key;
    nameTA: string;
    nameStudent: string;
    subject: string;
    Time: string;
  }

  // Defines the column names of the table and links to the Data via dataIndex
  const columns: ColumnsType<DataType> = [
    {
      title: 'Teaching Assistant',
      dataIndex: 'nameTA'
    },
    {
      title: 'Student',
      dataIndex: 'nameStudent'
    },
    {
      title: 'Subject',
      dataIndex: 'subject'
    },
    {
      title: 'Time',
      dataIndex: 'Time'
    }
  ];

  // renders the Table with columns and bookings data
  return (
    <div className="outerContainer">
      <Table columns={columns} dataSource={bookings} size="middle" />
    </div>
  );
}
