const multer = require('multer');
const upload = multer({ dest: '' }).single('file');

// contller upload file
const uploadFile = (req, res) => {
  // error handling
  upload(req, res, function (err) {
    // cases error
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        status: 400,
        message: 'Error to try uploading file',
      });
    } else if (err) {
      return res.status(400).json({
        status: 400,
        message: 'Error to try uploading file',
      });
    }

    // getting file metadata
    const fileFeatures = {
      name: req.file.originalname || undefined,
      type: req.file.mimetype || undefined,
      size: req.file.size || undefined,
    };

    // return response with file metadata
    return res.json(fileFeatures);
  });
};

module.exports = {
  uploadFile,
};
