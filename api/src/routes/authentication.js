import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/authorize', 
  passport.authenticate('local'),
  (req, res) => {
    try { 
      res.status(200).json({ 
        message: `${req.user.email} authenticated`,
        user: req.user,
      });
    } catch (error) {
      res.status(401).json({ error });
    }
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Successfully logged out' });
});

module.exports = router;
