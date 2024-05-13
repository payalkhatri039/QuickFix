import { getPaddedString } from '.';
import { KeyValueType } from '../types/commonTypes';

/**
 *
 * @param minTime has to be in HH:MM
 */
export const getTimeList = (minTime?: string): Array<KeyValueType<string>> => {
  let initialHour = 0;
  let initialMin = 0;
  const list = [];
  if (minTime) {
    console.log('Min time is', minTime);
    const minMinutes = (parseInt(minTime.split(':')[1]) + 30) % 60;
    let minHour = parseInt(minTime.split(':')[0]);
    if (minMinutes === 0) {
      minHour++;
    }
    initialHour = minHour;
    initialMin = minMinutes;
  }
  for (let i = initialHour; i < 24; ) {
    let hours = i;
    const min = initialMin;
    let key = `${getPaddedString(hours)}:${getPaddedString(min)}`;
    let hours_twl = hours % 12;
    hours_twl = hours_twl ? hours_twl : 12;
    let value = `${getPaddedString(hours_twl)}:${getPaddedString(min)} ${
      hours < 12 ? 'AM' : 'PM'
    }`;
    if (initialMin === 30) {
      i++;
    }
    initialMin = (initialMin + 30) % 60;
    let keyVal: KeyValueType<string> = { key, value };
    list.push(keyVal);
  }
  return list;
};

/**
 *
 * @param dateParam
 * @returns mm:ss AM|PM
 */

export const getAMPM = (dateParam: string) => {
  let arr = dateParam.split(':');
  let hours: number | string = parseInt(arr[0]);
  let minutes: number | string = parseInt(arr[1]);
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? getPaddedString(hours) : '12';
  minutes = getPaddedString(minutes);
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

/**
 *
 * @param date
 * @returns DDMMYY
 */

export const getDDMMYY = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear().toString().slice(-2);
  const updatedDate = `${getPaddedString(day)}${getPaddedString(
    month + 1
  )}${year}`;
  return updatedDate;
};

/**
 *
 * @param _date
 * @returns DD/MM/YY
 */

export const getSlashedDate = (_date: Date) => {
  const date = new Date(_date);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear().toString().slice(-2);
  const updatedDate = `${getPaddedString(day)}/${getPaddedString(
    month + 1
  )}/${year}`;
  return updatedDate;
};
