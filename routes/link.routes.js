const { Router } = require('express');
const Link = require('../models/Link');
const router = Router();
const auth = require('../middleware/auth.middleware');

router.post('/generate', async (req, res) => {
  try {
    //
  } catch (e) {
    res.status(500).json({ message: 'vse huovo' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: 'vse huovo' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: 'vse huovo' });
  }
});

module.exports = router;
