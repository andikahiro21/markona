const express = require("express");
const router = express.Router();

const { authenticateAdmin } = require("../middleware/authenticateAdmin");
const { getCategory, getCategoryMenu, getCategoryMenubyID, createCategory, editCategory, deleteCategory } = require("../controllers/categoryController");
const upload = require("../helpers/storage");

router.get("/", getCategory);
router.get("/menu", getCategoryMenu);
router.get("/menu/:id", getCategoryMenubyID);
router.use(authenticateAdmin);
router.post("/create", upload.array(), createCategory);
router.put("/:id", upload.array(), editCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
