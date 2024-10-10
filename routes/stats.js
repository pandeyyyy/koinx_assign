const express = require('express');
const Crypto = require('../models/Crypto');
const router = express.Router();

router.get('/stats', async (req, res) => {
  const { coin } = req.query;
  try {
    const latest = await Crypto.findOne({ coin }).sort({ time: -1 });
    if (!latest) return res.status(404).send({ error: 'No data found' });

    res.send({
      price: latest.price,
      marketCap: latest.marketCap,
      '24hChange': latest.change24h
    });
  } catch (err) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;
