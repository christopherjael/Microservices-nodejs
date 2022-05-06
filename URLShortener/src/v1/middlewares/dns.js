const dns = require('node:dns');

module.exports = (req, res, next) => {
  let { url } = req.body;
  // split the url for get domain name
  let domain = url.split('/')[2];

  // verify that the domain is valid
  dns.lookup(domain, (err, address, family) => {
    if (!address) {
      return res
        .status(400)
        .json({ status: '400 BAD REQUEST', message: 'Invalid domain' });
    }

    next();
  });
};
