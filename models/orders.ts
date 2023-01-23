import mongoose, { Document, Schema } from 'mongoose';

interface IOrderSchema extends Document {
  paymentMethod: string;
  user: mongoose.Types.ObjectId;
  transaction: object;
}
const OrderSchema = new Schema(
  {
    paymentMethod: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    transaction: {
      type: Object,
    },
    products: {
      type: Array,
    },
  },
  { timestamps: true }
);

const orders = mongoose.model<IOrderSchema>('orders', OrderSchema);

export default orders;
