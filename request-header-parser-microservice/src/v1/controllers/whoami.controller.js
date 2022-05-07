const whoami = (req, res) => {
  let software = req.get('user-agent');
  let ipaddress = req.ip;
  let language = req.get('accept-language');

  res.json({
    ipaddress: ipaddress || undefined,
    language: language || undefined,
    software: software || undefined,
  });

  res.end();
};

module.exports = {
  whoami,
};
