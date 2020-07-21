import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BasicStrategy } from 'passport-http';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../db/user.schema';

const router = express.Router();

passport.use('login', new BasicStrategy(
  async (email, password, done) => {
    try { 
      const user = await User.findOne({ email })
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return done(null, false) 

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// verify user token
passport.use(new JWTStrategy({
  secretOrKey: process.env.JWT_SECRET_KEY, 
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }, async (token, done) => {
    try {
      // pass user details onto next middleware
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  })
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (error, user, info)  => {
    try {
      if (error || !user) {
        return next(new Error(error));
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error); 
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY);
        return res.status(200).send({ token, user });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Successfully logged out' });
});

module.exports = router;
