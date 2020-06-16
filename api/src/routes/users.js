import express from 'express';
import bcrypt from 'bcrypt';
import User from '../db/user.schema';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.post('/', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const params = Object.assign(req.body, { password: hash });
    const user = new User(params);
    const newUser = await user.save();

    res.status(201).json({ 
      message: `${newUser.firstName} ${newUser.lastName} created`, 
      user: newUser,
    })
  } catch (error) {
    res.status(400).json({ error })
  }
});

module.exports = router;
