import express from 'express';
import bcrypt from 'bcrypt';
import User from '../db/user.schema';

const router = express.Router();

// sign up
router.post('/', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const params = Object.assign(req.body, { password: hash });
    const user = new User(params);
    const newUser = await user.save();
    res.status(201).json({ 
      message: `${user.firstName} ${user.lastName} created`, 
      user,
    })
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.delete('/', async (req, res) => {
  try {
    await User.findOneAndRemove({ email: req.body.email });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error });
  }
});


module.exports = router;
