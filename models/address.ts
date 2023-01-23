import mongoose, { Document, Schema } from 'mongoose';

interface IAddresschema extends Document {
  firstName: string;
  lastName: string;
  addressOne: string;
  addressTwo: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
  default: boolean;
  user: mongoose.Types.ObjectId;
}
const AddressSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    addressOne: {
      type: String,
    },
    addressTwo: {
      type: String,
    },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
    phoneNumber: { type: String },
    default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const address = mongoose.model<IAddresschema>('address', AddressSchema);

export default address;
