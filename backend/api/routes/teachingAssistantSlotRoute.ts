import { Router } from 'express';
import * as TASlotController from '../controllers/teachingAssistantController';

/**
 * Consists of routes for creating new slots, getting TA slots
 * and booking TA slot
 */
const TASlotRouter = Router();
TASlotRouter.route('/')
  .post(TASlotController.createSlots)
  .get(TASlotController.getTASlots);

TASlotRouter.route('/bookTASlot/').post(TASlotController.bookTASlot);

export default TASlotRouter;
