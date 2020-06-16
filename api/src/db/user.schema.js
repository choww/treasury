import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  monthlyIncome: {
    type: Number,
    required: true,
  },
  savingsGoal: {
    type: Number,
    default: 0,
  },
  savings: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', userSchema);
