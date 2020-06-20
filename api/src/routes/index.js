import express from 'express';
import passport from 'passport';
import userRouter from './users';
import authRouter from './authentication';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Treasury API!' });
});

router.use('/api/users', userRouter);
router.use('/api/auth', authRouter);
// app.use('/api/transactions', passport.authentication('jwt', { session: false }), transactionRouter);


export default router;
