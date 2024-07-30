import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    likedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }], //* array of item IDs liked by user
    avatar: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);
export default User;
