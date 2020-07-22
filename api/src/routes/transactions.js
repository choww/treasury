import express from 'express';
import Transaction from '../db/transaction.schema';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const params = Object.assign(req.body, { userId: req.user._id });
    const transaction = new Transaction(params);
    const newTransaction = await transaction.save();

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/', async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id });
  res.status(200).send({ transactions });
});

module.exports = router;
