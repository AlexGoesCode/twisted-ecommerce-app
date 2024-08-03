import mongoose from 'mongoose';

const { Schema } = mongoose;

// default is false
const itemSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  { timestamps: true }
);

const itemModel = mongoose.model('Item', itemSchema);
export default itemModel;
