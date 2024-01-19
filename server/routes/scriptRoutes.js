const express = require('express');
const router = express.Router();

const upload = require('../middleware/storage');
const {
  getMenubyID,
  getScripts,
  createScript,
  editScript
} = require('../controllers/scriptController');

router.get('/', getScripts);
// router.get('/:id', getMenubyID);
router.post('/create', upload.single('file'), createScript);
router.put('/:id', upload.single('file'), editScript);
// router.put('/:delete', deleteMenu);

module.exports = router;
