import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    index: true,
    required: true,
  },
  category: {
    type: String,
    index: true,
    required: true,
  },
  isExpense: {
    type: Boolean,
    default: true,
  },
  amount: {
    type: Number,
    required: true,
    get:
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
