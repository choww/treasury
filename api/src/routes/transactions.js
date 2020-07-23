import express from 'express';
import moment from 'moment';
import Transaction from '../db/transaction.schema';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const params = Object.assign(req.body, { userId: req.user._id });
    const transaction = new Transaction(params);
    const newTransaction = await transaction.save();

    res.status(201).json(newTransaction);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

router.get('/', async (req, res) => {
  const params = { userId: req.user._id };
  const { filter } = req.query;
  if (filter) {
    const value = parseInt(req.query[filter]);
    const start = moment()[filter](value).startOf(filter).toISOString();
    const end = moment()[filter](value).endOf(filter).toISOString();

    params.date = {
      '$gte': start,
      '$lte': end,
    };
  }

  try {
    const transactions = await Transaction.find(params);
    res.status(200).send({ transactions });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
