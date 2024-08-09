import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    // likedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }], //* array of item IDs liked by user
    avatar: { type: String, required: false },
    shoppingCart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  },
  { timestamps: true }
);

const userModel = mongoose.model('user', userSchema);
export default userModel;
