import mongoose, { Schema } from 'mongoose';
import { ISlot } from '../../types/teachingAssistantSlots';

const TASlotsSchema = new mongoose.Schema<ISlot>(
  {
    teachingAssistantId: {
      type: String,
      ref: 'User'
    },
    day: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    isBooked: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
);
TASlotsSchema.index({ teachingAssistantId: 1, day: 1 }, { unique: true });
const model = mongoose.model('TASlots', TASlotsSchema);
export default model;
