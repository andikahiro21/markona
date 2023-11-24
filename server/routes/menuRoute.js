const express = require("express");
const router = express.Router();

const { authenticateAdmin } = require("../middleware/authenticateAdmin");
const { authenticateUser } = require("../middleware/authenticateUser");
const upload = require("../helpers/storage");
const { getMenu, getMenubyID, createMenu, editMenu, deleteMenu, getPurchaseMenu, getAllPurchaseMenu } = require("../controllers/menuController");

router.get("/", getMenu);
router.get("/:id", getMenubyID);
router.use(authenticateUser);
router.get("/purchase/order", getPurchaseMenu);
router.use(authenticateAdmin);
router.get("/purchase/all-order", getAllPurchaseMenu);
router.post("/create", upload.single("image"), createMenu);
router.put("/:id", upload.single("image"), editMenu);
router.delete("/:id", deleteMenu);

module.exports = router;
