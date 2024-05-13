import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import type { Dayjs } from 'dayjs';
import { Badge, BadgeProps, Calendar } from 'antd';
import Loader from '../Loader/Loader';
import { updateSelectedSlotDate } from '../../redux/actions/User/actions';

interface ISlotCalendar {
  taID: string;
}

/**
 *
 * @param param0
 * @returns SlotCalendar React.Component
 *
 * @description
 * This component is a wrapper arround antd calendar
 * and overrides calendar date view. If slots for a
 * particular date are available for a TA then the date
 * will have a small dot at the bottom
 */

export default function SlotCalendar({ taID }: ISlotCalendar) {
  const { slots: slotsObj = {}, displayState } = useSelector(
    (state: RootState) => state.taSlots
  );
  const [slots, setSlots] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (slotsObj[taID] !== undefined) {
      setSlots(slotsObj[taID]);
      console.log(slotsObj[taID]);
    }
  }, [taID, slotsObj]);
  const disabledDate = (day: Dayjs) => {
    const formatedValue = day.format('DDMMYY');
    if (slots[formatedValue]) {
      console.log('Do not disable', formatedValue);
      return false;
    }

    return true;
  };
  const dateFullCellRender = (value: Dayjs) => {
    const formatedValue = value.format('DDMMYY');
    if (slots[formatedValue]) {
      return (
        <div className="ant-picker-cell-inner ant-picker-calendar-date">
          <p>{value.date()}</p>
          <div className="dot"></div>
        </div>
      );
    } else {
      return (
        <div className="ant-picker-cell-inner ant-picker-calendar-date">
          {value.date()}
        </div>
      );
    }
  };

  const onChange = (day: Dayjs) => {
    const formattedValue = day.format('DDMMYY');
    console.log('Change of date');
    dispatch(updateSelectedSlotDate(taID, formattedValue));
  };

  if (displayState === 'LOADING') {
    return (
      <div className="relative">
        <Calendar
          fullscreen={false}
          defaultValue={null}
          dateFullCellRender={dateFullCellRender}
        />
        <div className="calendar_loader_background" />
        <div className="calendar_loader">
          <Loader message="" />
        </div>
      </div>
    );
  }

  return (
    <Calendar
      fullscreen={false}
      dateFullCellRender={dateFullCellRender}
      disabledDate={disabledDate}
      onChange={onChange}
    />
  );
}
