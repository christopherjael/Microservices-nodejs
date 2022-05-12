const ShortURLs = require('../model/shortURLs');
const dns = require('dns');

const createShortURL = async (req, res) => {
  let { url } = req.body;
  const httpRegex = /^(http|https)(:\/\/)/;

  if (!httpRegex.test(url)) {
    return res.json({ error: 'invalid url' });
  }

  const urlObject = new URL(url);
  // verify that the domain is valid
  dns.lookup(urlObject.hostname, async (err, address, family) => {
    if (err) {
      return res.json({ error: 'invalid url' });
    }

    if (!address) {
      return res.json({ error: 'invalid url' });
    }

    try {
      let lastDoc = await ShortURLs.findOne().sort({ $natural: -1 });

      let nextNumber;

      if (!lastDoc || lastDoc.shortURL < 1) {
        nextNumber = 1;
      } else {
        nextNumber = lastDoc.shortURL + 1;
      }

      const payload = {
        originalUrl: url,
        shortURL: nextNumber,
      };
      const newShortURL = new ShortURLs(payload);

      await newShortURL.save();

      const { originalUrl, shortURL } = newShortURL;

      res.status(201).json({
        original_url: originalUrl,
        short_url: shortURL,
      });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
      throw new Error(error.message);
    }
  });
};

const redirectToShortURL = async (req, res) => {
  const { existShortURL } = req;
  try {
    res.redirect(existShortURL.originalUrl);
    res.end();
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
    throw new Error(error.message);
  }
};

module.exports = {
  createShortURL,
  redirectToShortURL,
};
