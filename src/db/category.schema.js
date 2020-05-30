import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: String,
  required: true,
});

module.exports = categorySchema;
