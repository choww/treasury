import express from 'express';
import passport from 'passport';
import categoryRouter from './categories';
import userRouter from './users';
import transactionRouter from './transactions';

const router = express.Router();

router.use('/api/categories', passport.authenticate('jwt', { session: false }), categoryRouter);
router.use('/api/users', passport.authenticate('jwt', { session: false }), userRouter);
router.use('/api/transactions', passport.authenticate('jwt', { session: false }), transactionRouter);

export default router;
