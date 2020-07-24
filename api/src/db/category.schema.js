import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

categorySchema.index({ name: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Category', categorySchema);
