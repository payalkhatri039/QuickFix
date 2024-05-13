import mongoose, { Schema } from 'mongoose';
import { ITASlotSchema } from '../../types/teachingAssistantSlots';

function subSchema(props) {
  return new Schema(props, { _id: false });
}

const TASlotAvailabitySchema = new mongoose.Schema<ITASlotSchema>(
  {
    teachingAssistantId: {
      type: String,
      ref: 'User'
    },
    availableSlots: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'TASlots'
      }
    ]
  },
  { versionKey: false }
);

const model = mongoose.model('TASlotAvailabity', TASlotAvailabitySchema);
export default model;
