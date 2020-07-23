import express from 'express';
import Category from '../db/category.schema';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const params = Object.assign(req.body, { userId: req.user._id });
    const category = new Category(params);
    const newCategory = await category.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const category = await Category.findOne({
      userId: req.user._id,
      name: req.params.name,
    });

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

router.get('/', async (req, res) => {
  const categories = await Category.find({
    userId: req.user._id,
  });
  res.status(200).send({ categories });
});

module.exports = router;
