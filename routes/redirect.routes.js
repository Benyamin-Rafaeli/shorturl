const Link = require('../models/Link');
const { Router } = require('express');
const router = Router();

router.get('/:code', async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });
    if (link) {
      console.log(link)
      debugger
      link.clicks++;
      await link.save();
      return res.redirect(link.from);
    }
    res.status(404).json({ message: 'nihuya ne nashel' });

  } catch (e) {
    res.status(500).json({ message: 'vse huovo' });
  }
});

module.exports = router;
