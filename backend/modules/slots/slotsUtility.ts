import { Request } from 'express';

/**
 * Description :
 * 1. The start date and end date are extracted
 * 2. The start time and end time are extracted
 * 3. The count of slots per day are counted according to duration
 * 4. For every particular day, the slots are created with start and end time
 * 5. Each day's slot are saved in createdSlots list
 * @param availableRawSlots : consists of the range (start day - end day)
 * and (start time - end time)
 * @returns : structued slots : (every 15min) per day till end day
 */
export const createSlotsHelper = (availableRawSlots) => {
  const dateRange = availableRawSlots.dateRange;
  const startDate = new Date(dateRange[0]).getTime();
  const endDate = new Date(dateRange[1]).getTime();
  const startSlotTime = availableRawSlots.startTime.split(':');
  const endSlotTime = availableRawSlots.endTime.split(':');
  let createdSlots = [];
  for (
    let eachDate = startDate;
    eachDate <= endDate;
    eachDate += 24 * 60 * 60 * 1000
  ) {
    const dayStartSlot = new Date(eachDate);
    dayStartSlot.setHours(startSlotTime[0], startSlotTime[1]);
    const dayEndSlot = new Date(eachDate);
    dayEndSlot.setHours(endSlotTime[0], endSlotTime[1]);

    const startTimeInSeconds =
      dayStartSlot.getHours() * 60 + dayStartSlot.getMinutes();
    const endTimeInSeconds =
      dayEndSlot.getHours() * 60 + dayEndSlot.getMinutes();

    const numOfSlots = (endTimeInSeconds - startTimeInSeconds) / 15;
    let endTimeSlot = '';
    let startTimeSlot =
      getPaddedString(dayStartSlot.getHours()) +
      ':' +
      getPaddedString(dayStartSlot.getMinutes());

    for (let eachSlot = 1; eachSlot <= numOfSlots; eachSlot++) {
      dayStartSlot.setMinutes(dayStartSlot.getMinutes() + 15);
      endTimeSlot =
        getPaddedString(dayStartSlot.getHours()) +
        ':' +
        getPaddedString(dayStartSlot.getMinutes());

      let dayOfWeek = new Date(eachDate);
      dayOfWeek.setHours(dayStartSlot.getHours());
      dayOfWeek.setMinutes(dayStartSlot.getMinutes());

      let saveSlot = {
        teachingAssistantId: availableRawSlots.teachingAssistantId,
        day: dayOfWeek,
        startTime: startTimeSlot,
        endTime: endTimeSlot,
        isBooked: false
      };
      createdSlots.push(saveSlot);
      startTimeSlot = endTimeSlot;
    }
  }
  return createdSlots;
};

/**
 * Description:
 * 1. Filters the slots which are available for booking
 * 2. According to every date, the slots are stored under them in a array list
 * @param teachingAssistantSlots : raw slots of TA consisting of all slots of every day
 * @returns day wise available slots of the particular TA
 */
export const structureTASlotsData = (teachingAssistantSlots) => {
  let availableSlots = [];
  availableSlots = teachingAssistantSlots.filter(
    (eachSlot) => eachSlot.isBooked === false
  );

  let storeDates = {};
  for (let eachSlot = 0; eachSlot < availableSlots.length; eachSlot++) {
    let tempDate = availableSlots[eachSlot].day;
    tempDate.setHours(0, 0);
    if (storeDates[tempDate]) {
      storeDates[tempDate].push(availableSlots[eachSlot]);
    } else {
      storeDates[tempDate] = new Array();
      storeDates[tempDate].push(availableSlots[eachSlot]);
    }
  }
  console.log('stored dates', storeDates);
  return storeDates;
};

export const getPaddedString = (input) => `0${input}`.slice(-2);
