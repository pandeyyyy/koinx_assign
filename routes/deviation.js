const express = require('express');
const Crypto = require('../models/Crypto');
const router = express.Router();

router.get('/deviation', async (req, res) => {
  const { coin } = req.query;
  try {
    const prices = await Crypto.find({ coin }).sort({ time: -1 }).limit(100).select('price');
    if (prices.length < 2) return res.status(400).send({ error: 'Not enough data' });

    const priceArr = prices.map(p => p.price);
    const mean = priceArr.reduce((a, b) => a + b) / priceArr.length;
    const variance = priceArr.map(p => (p - mean) ** 2).reduce((a, b) => a + b) / priceArr.length;
    const stdDev = Math.sqrt(variance);

    res.send({ deviation: stdDev.toFixed(2) });
  } catch (err) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;
