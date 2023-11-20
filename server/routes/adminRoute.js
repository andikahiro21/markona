const express = require("express");
const router = express.Router();

const { authenticateAdmin } = require("../middleware/authenticateAdmin");

router.use(authenticateAdmin);
// router.get("/brand", getBrand);
module.exports = router;
