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

// get oldest transaction for the current user
router.get('/oldest', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ 
      userId: req.user._id 
    }).sort({ date: 1 });
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

router.get('/', async (req, res) => {
  const { filter, sort } = req.query;
  const params = { userId: req.user._id };
  const sortParams = JSON.parse(sort);

  if (filter) {
    const year = parseInt(req.query.year);
    let date = moment().year(year)
    if (req.query.month) {
      date = date.month(req.query.month);
    }
    const start = date.startOf(filter).toISOString();
    const end = date.endOf(filter).toISOString();

    params.date = {
      '$gte': start,
      '$lte': end,
    };
  }

  try {
    const transactions = await Transaction.find(params)
      .sort(sortParams);
    res.status(200).send({ transactions });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { 
        _id: req.params.id,
        userId: req.user._id,
      },
      { $set: req.body },
    );
    res.status(200).json(transaction);
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
