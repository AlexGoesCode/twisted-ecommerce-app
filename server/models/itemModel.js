import mongoose, { mongo } from 'mongoose';

const { Schema } = mongoose;

// default is false
const itemSchema = new Schema({
  name: { type: String, require: true, unique: true },
  body: String,
  comments: [{ body: String, date: Date }],
  likes: Number,
});

const itemModel = mongoose.model('item', itemSchema);

export default itemModel;
