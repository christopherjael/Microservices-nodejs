const ShortURLs = require('../model/shortURLs');

const createShortURL = async (req, res) => {
  let { url } = req.body;
  try {
    const payload = {
      originalUrl: url,
    };
    const newShortURL = new ShortURLs(payload);

    await newShortURL.save();

    const { originalUrl, shortURL } = newShortURL;

    res.status(201).json({
      status: 200,
      data: {
        originalUrl,
        shortURL,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
    throw new Error(error.message);
  }
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
