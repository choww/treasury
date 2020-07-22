import express from 'express';
import passport from 'passport';
import userRouter from './users';
import transactionRouter from './transactions';

const router = express.Router();

router.use('/api/users', passport.authenticate('jwt', { session: false }), userRouter);
router.use('/api/transactions', passport.authenticate('jwt', { session: false }), transactionRouter);

export default router;
