import { Request, Response } from 'express';
import * as controllerHelper from '../../modules/ControllerHelper';
import * as availableTASlotService from '../../api/services/availableTASlots';
import * as bookingService from '../../api/services/booking';
import {
  createSlotsHelper,
  structureTASlotsData
} from '../../modules/slots/slotsUtility';
import { getCourseFromTaID } from '../services/courseUser';
import EmailModule from '../../modules/auth/email';
import { getUserByID } from '../services/user';

/**
 * Description:
 * 1. Delegates the work to createSlotHelper to segregate the slots
 * according to the duration of every slot (15minutes), and sends to service.
 * 2. The course id is extracted from TA-ID and all the students in the course
 * are sent a email regarding the slots creation by TA
 * @param req : body consists of the slot booking details
 * @param res : Success/Error
 */
export const createSlots = async (req: Request, res: Response) => {
  try {
    const availableRawTASlots = req.body;
    const createdSlots = createSlotsHelper(availableRawTASlots);
    const savedTASlots = await availableTASlotService.saveSlots(createdSlots);
    const taCourse: any = await getCourseFromTaID(
      availableRawTASlots.teachingAssistantId
    );
    const studentEmailList = taCourse.studentId.map((student) => student.email);
    console.log(studentEmailList);
    let emailModule = new EmailModule(studentEmailList);
    emailModule.sendNewSlotsMail(taCourse.courseId.toString());
    console.log('TA course is', taCourse.studentId);
    res.json({ res: 'Slots created successfully' });
    res.status(200);
  } catch (error) {
    console.log('Error is', error);
    res.json({ res: 'Slots already booked in the time feame provided' });
    res.status(500);
  }
};

/**
 * @param req : gets the ta-id from query
 * @param res : structured TA slots
 * Description:
 * Delegates the service to get slots according to the TA.
 * The slots are then send to structureTASlotsData to make them in required format
 */
export const getTASlots = async (req: Request, res: Response) => {
  try {
    const teachingAssistantId = req.query.taid;
    const teachingAssistantRawSlots = await availableTASlotService.getTASlots(
      teachingAssistantId
    );
    const structuredTASlots = structureTASlotsData(teachingAssistantRawSlots);
    res.json({ structuredTASlots });
    res.status(200);
  } catch (error) {
    res.json({ res: 'Slots not available for the TA' });
    res.status(500);
  }
};

/**
 * @param req : body consists of studentId, slotId, TAId, and course ID
 * @param res : booking details
 * Description: 
 * Delegates the booking ID to availableTASlot Service.
 * Sends the booking details to bookingService
 * Sends email to the students - regarding confirmation of booking
 */

export const bookTASlot = async (req: Request, res: Response) => {
  try {
    const {
      studentID,
      slot_ID: bookingSlotID,
      teachingAssistantID,
      courseID
    } = req.body;
    const taDetail = await getUserByID(teachingAssistantID);
    const studentDetail = await getUserByID(studentID);
    const bookedTASlot = await availableTASlotService.bookTASlots(
      bookingSlotID
    );
    const booking = await bookingService.save({
      slot: bookingSlotID,
      student: studentID,
      ta: teachingAssistantID,
      course: courseID
    });
    const emailModule = new EmailModule(null);
    emailModule.sendBookingMail({ student: studentDetail, ta: taDetail });
    res.json({ booking });
    res.status(200);
  } catch (error) {
    console.log('error is', error);
    res.json({ res: 'Unable to book the TA slot' });
    res.status(500);
  }
};
