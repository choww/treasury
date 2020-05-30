import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // logic here
  // res.status(403).json({ message: 'validation error' })
  res.json({
    users: [],
  });
});

module.exports = router;
