const express = require("express");
const router = express.Router();

const { authenticateAdmin } = require("../middleware/authenticateAdmin");
const { authenticateUser } = require("../middleware/authenticateUser");

const upload = require("../helpers/storage");
const { createPurchase, notificationMidtrans } = require("../controllers/paymentController");

router.use(authenticateUser);
router.post("/", upload.array(), createPurchase);
router.post("/midtrans-notification", notificationMidtrans);

module.exports = router;
