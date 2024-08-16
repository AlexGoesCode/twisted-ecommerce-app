import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item',
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    shippingAddress: { type: String, required: false, default: '' },
    paymentMethod: { type: String, required: false, default: 'Not specified' },
    totalPrice: { type: Number, required: false, default: 0.0, min: 0 },
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model('Orders', orderSchema);
export default orderModel;
