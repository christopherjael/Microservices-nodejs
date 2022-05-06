const ShortURLs = require('../model/shortURLs.js');

module.exports = async (req, res, next) => {
  let { short_url } = req.params;
  try {
    const existShortURL = await ShortURLs.findOne({ shortURL: short_url });
    if (!existShortURL) {
      return res.status(400).json({
        status: 400,
        message: 'this shortURL not exist in out registers',
      });
    }
    req.existShortURL = existShortURL;
    next();
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
    throw new Error(error.message);
  }
};
