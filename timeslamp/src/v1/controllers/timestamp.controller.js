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
  let date_string = req.params.date;

  let unix = null;
  let utc = null;

  if (
    date_string.includes('-') ||
    date_string.includes('%') ||
    date_string.includes(' ')
  ) {
    date_string = decodeURI(date_string);
    unix = new Date(date_string).getTime();
    utc = new Date(date_string).toUTCString();
  } else {
    date_string = parseInt(date_string);

    unix = new Date(date_string).getTime();
    utc = new Date(date_string).toUTCString();
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
