const axios = require('axios');
const Crypto = require('../models/Crypto');
const cron = require('node-cron');

const fetchData = async () => {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const res = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: coins.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true
      }
    });

    coins.forEach(async (coin) => {
      const data = res.data[coin];
      const newCrypto = new Crypto({
        coin,
        price: data.usd,
        marketCap: data.usd_market_cap,
        change24h: data.usd_24h_change
      });
      await newCrypto.save();
    });
  } catch (err) {
    console.log('Error fetching data:', err);
  }
};

cron.schedule('0 */2 * * *', fetchData);

module.exports = fetchData;
