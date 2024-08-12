import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: { type: String, required: false },
    paymentMethod: { type: String, required: false },
    totalPrice: { type: Number, required: false },
    status: { type: String, default: 'Pending' }, // Order status: Pending, Shipped, Delivered, etc.
  },
  { timestamps: true }
);

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;
