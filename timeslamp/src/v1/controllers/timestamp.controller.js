const getCurrentDate = (req, res) => {
  const unix = new Date().getTime();
  const utc = new Date().toUTCString();

  return res.json({
    status: 'OK',
    data: {
      unix,
      utc,
    },
  });
};

const getDate = (req, res) => {
  let { date } = req.params;

  let unix = null;
  let utc = null;

  if (date.includes('-')) {
    unix = new Date(date).getTime();
    utc = new Date(date).toUTCString();
  } else {
    date = parseInt(date);

    unix = new Date(date).getTime();
    utc = new Date(date).toUTCString();
  }

  if (!unix | !utc) {
    return res.status(400).json({
      status: '201 BAD REQUEST',
      error: 'Invalid date',
    });
  }

  return res.status(200).json({
    status: 'OK',
    data: {
      unix,
      utc,
    },
  });
};

module.exports = {
  getCurrentDate,
  getDate,
};
