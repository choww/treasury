import mongoose from 'mongoose';
// import Category from './category.schema';

const transactionSchema = new mongoose.Schema({
  userId: {
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
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // category: {
  //   type: Category,
  //   required: true,
  // }
});

module.exports = mongoose.model('Transaction', transactionSchema);
