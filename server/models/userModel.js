import mongoose from 'mongoose';
const { Schema } = mongoose;

const shoppingCartItemSchema = new Schema(
  {
    quantity: { type: Number },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    // likedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }], //* array of item IDs liked by user
    avatar: { type: String, required: false },
    shoppingCart: { type: [shoppingCartItemSchema], default: [] },
  },
  { timestamps: true }
);

const userModel = mongoose.model('user', userSchema);
export default userModel;
