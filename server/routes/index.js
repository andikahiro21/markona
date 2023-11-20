const express = require("express");
const userRoute = require("./userRoute");
const adminRoute = require("./adminRoute");

const router = express.Router();

router.use("/", userRoute);
router.use("/admin", adminRoute);

module.exports = router;
