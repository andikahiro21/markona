const express = require('express');
const router = express.Router();

const upload = require('../middleware/storage');
const {
  getMenubyID,
  createMenu,
  editMenu,
  deleteMenu,
  getScripts
} = require('../controllers/scriptController');

router.get('/', getScripts);
router.get('/:id', getMenubyID);
router.post('/create', upload.single('image'), createMenu);
router.put('/:id', upload.single('image'), editMenu);
router.put('/:delete', deleteMenu);

module.exports = router;
