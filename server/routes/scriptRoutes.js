const express = require('express');
const router = express.Router();

const upload = require('../middleware/storage');
const {
  getScripts,
  createScript,
  editScript,
  deleteScripts,
  getScriptbyID
} = require('../controllers/scriptController');

router.get('/', getScripts);
router.get('/:id', getScriptbyID);
router.post('/create', upload.single('file'), createScript);
router.put('/:id', upload.single('file'), editScript);
router.delete('/delete', deleteScripts);

module.exports = router;
