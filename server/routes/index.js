const express = require("express");
const userRoute = require("./userRoute");
const adminRoute = require("./adminRoute");
const categoryRoute = require("./categoryRoute");

const router = express.Router();

router.use("/", userRoute);
router.use("/admin", adminRoute);
router.use("/category", categoryRoute);

module.exports = router;
