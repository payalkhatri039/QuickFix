import { getPaddedString } from '.';
import { ISlots, ISlotsResponse } from '../types/slots';
import { getDDMMYY } from './DateTimeHelper';

/**
 *
 * @param slotsResponse : ISlotsResponse
 * @returns a transformed response
 */

export const tranformSlotsResponse = (slotsResponse: ISlotsResponse) => {
  const updatedResponse = {};
  const slots = slotsResponse.structuredTASlots;
  for (let key in slots) {
    const date = new Date(key);
    if (isValidDate(date)) {
      const updatedKey = getDDMMYY(date);
      updatedResponse[updatedKey] = slots[key];
    }
  }
  return updatedResponse;
};

/**
 *
 * @param d : Date
 * @returns boolean
 *
 * This function check if typeof d is Date
 */

function isValidDate(d: Date) {
  return !isNaN(d.getTime());
}
