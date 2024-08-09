import mongoose from 'mongoose';

const { Schema } = mongoose;

// default is false
const itemSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    // inStock: { type: Number, required: true },
    country: { type: String, required: true },
    body: { type: String, required: true, default: 'I love it' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    image: [{ url: String, alt: String }], // Array of image objects
    link: { type: String, required: false },
  },
  { timestamps: true }
);

const itemModel = mongoose.model('Item', itemSchema);
export default itemModel;
