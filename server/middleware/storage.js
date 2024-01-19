const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const fileName = req.body.file_name.replace(/\s+/g, '_').endsWith('.pdf')
      ? req.body.file_name.replace(/\s+/g, '_') + '-' + Date.now()
      : req.body.file_name.replace(/\s+/g, '_') + '-' + Date.now() + '.pdf';
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Please upload only PDF files.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
