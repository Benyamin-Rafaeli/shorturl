const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { checks, validationResult, check } = require('express-validator');
const User = require('../models/User');
const router = Router();

router.post(
  '/register',
  [
    check('email', 'huioviy email').isEmail(),
    check('password', 'huioviy parole minimum 20 cm').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      // console.log('Body: ', req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'huivie dannie',
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'uzhe takoi est' });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'sozdan user' });
    } catch (e) {
      res.status(500).json({ message: 'vse huovo' });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'zahuyar valid email').normalizeEmail().isEmail(),
    check('password', 'pustoi password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'huivie dannie pri logine',
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'usera netu' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'huoviy parol poprobuy eshe' });
      }
      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h',
      });
      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'vse huovo' });
    }
  }
);

module.exports = router;
