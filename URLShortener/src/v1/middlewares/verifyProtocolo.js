module.exports = (req, res, next) => {
  let { url } = req.body;

  // verify that the url has a correct protocol (http | https)
  if (url.includes('http://') | url.includes('https://')) {
    return next();
  }

  return res.status(400).json({
    status: '400 BAD REQUEST',
    error: 'Invalid URL',
  });
};
