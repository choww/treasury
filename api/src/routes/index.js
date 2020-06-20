import express from 'express';
import passport from 'passport';
import userRouter from './users';

const router = express.Router();

router.use('/api/users', passport.authenticate('jwt', { session: false }), userRouter);

export default router;
