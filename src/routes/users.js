import express from 'express';
import User from '../db/user.schema';
var router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error })
  }
});

module.exports = router;
