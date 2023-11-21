const express = require("express");
const router = express.Router();

const { authenticateAdmin } = require("../middleware/authenticateAdmin");
const upload = require("../helpers/storage");
const { getMenu, getMenubyID, createMenu, editMenu, deleteMenu } = require("../controllers/menuController");

router.get("/", getMenu);
router.get("/:id", getMenubyID);
router.use(authenticateAdmin);
router.post("/create", upload.single("image"), createMenu);
router.put("/:id", upload.single("image"), editMenu);
router.delete("/:id", deleteMenu);

module.exports = router;
